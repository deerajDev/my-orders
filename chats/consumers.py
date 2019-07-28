from rest_framework import serializers
from items.serializers import FoodItemSerializer, OrderSerializer
from rest_framework.response import Response
from items.models import Order
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .utils import parseOrders
import json
import ast

class ChatConsumer(WebsocketConsumer):

    def notifyUser(self, msg, msg_type):
        return self.send(json.dumps({
            'message_type': msg_type,
            'message': msg,
            'command': 'notifyUser'
        }))

    def connect(self):
        try:
            self.room_name = self.scope['url_route']['kwargs']['shop_id']
            self.room_group_name = f'chat_{self.room_name}'
            # next step is to connect to the shop room chat
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
            pending_orders = Order.objects.filter(
                shop_id=self.room_name, pending=True)
            parsed_data = parseOrders(pending_orders)
            self.send(json.dumps(
                {'order_data': parsed_data,
                 'command': 'receivePendingOrders'}))
            self.notifyUser('connected', 'success')
        except Exception as e:
            self.notifyUser(str(e), 'error')

    def receive(self, text_data):
        parsed_data = ast.literal_eval(json.loads(text_data))

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {'type': parsed_data['command'],
             'data': parsed_data['data']}
        )

    def disconnect(self, extra_data):
        pass

    def newOrder(self, data):
        try:
            shop_id = self.room_name
            item_id = data['data']['item_id']
            order_type = data['data']['order_type']
            description = data['data']['description']
            new_order = Order.objects.create(
                shop_id=shop_id, item_id=item_id, order_type=order_type, description=description)
            self.send(json.dumps({
                'order_info': {'id': new_order.id, 'item_name': new_order.item.name, 'order_type': order_type, 'description': description},
                'command': 'receiveNewOrder'
            }))
            return self.notifyUser(f'{new_order.item.name} order  placed', 'success')

        except Exception as e:
            return self.notifyUser(str(e), 'error')

    def newItem(self, data):
        try:
            shop_id = self.room_name
            name = data['data']['item_name']
            cost = data['data']['cost']
            serializer = FoodItemSerializer(
                data={'shop_id': shop_id, 'name': name, 'cost': cost})
            serializer.is_valid(raise_exception=True)
            new_item = serializer.create(serializer.validated_data)
            self.send(json.dumps({
                'item_info': {'id': new_item.id, 'name': new_item.name},
                'command': 'dispatchreceiveNewItem'
            }))
            msg = f'{name} item created'
            self.notifyUser(msg, 'success')

        except Exception as e:
            self.notifyUser(str(e), 'error')

    def orderCompleted(self, data):
        order_id = int(data['data'])
        order = Order.objects.filter(pk=order_id)[0]
        order.pending = False
        order.save()
        self.send(json.dumps({
            'order_id': order_id,
            'command': 'reveiveOrderCompleted'
        }))
