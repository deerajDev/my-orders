from rest_framework import serializers
from items.serializers import FoodItemSerializer, OrderSerializer
from rest_framework.response import Response
from items.models import Order , Item
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .utils import parseOrders
import json
import ast

class ChatConsumer(WebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super(ChatConsumer ,self).__init__(*args, **kwargs)
        self.callBacks = {
            'newOrder':self.newOrder,
            'newItem' :self.newItem,
            'orderCompleted' :self.orderCompleted
        }


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
        try:
            data, send_method = self.callBacks[parsed_data['command']](
                            parsed_data['data'])

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {'type': send_method,
                'data': data}
            )
        except Exception as e:
            self.notifyUser('could not send the data ', 'error')

    def disconnect(self, extra_data):
        pass

    def newOrder(self, new_order):
        item_id = new_order['item_id']
        shop_id = self.room_name
        order_type = new_order['order_type']
        description = new_order['description']
        new_order = Order.objects.create(item_id = item_id, shop_id=shop_id, order_type=order_type)
        serialzed_new_order = { 'id':new_order.id ,   'name':new_order.item.name, 'order_type':new_order.order_type, 'description': new_order.description}
        return (serialzed_new_order, 'sendNewOrder')

    def newItem(self, new_item):
        try:
            name = new_item['name']
            shop_id = self.room_name
            cost = new_item['cost']
            instance = Item.objects.create(name=name, shop_id=shop_id, cost=int(cost))
            self.notifyUser(f'{name} item added', 'success')
            return (instance, 'sendNewItem')
        except Exception as e:
            return self.notifyUser('Invalid data or item exist', 'error')

    def orderCompleted(self, data):
        order_id = data['id']
        order = Order.objects.filter(pk=order_id)[0]
        order.pending = False
        order.save()
        return (order_id , 'sendOrderCompleted')


    def sendNewOrder(self, data):
        return self.send(json.dumps({
            'order':{'id':  data['data']['id'] , 'name': data['data']['name'] , 'order_type' : data['data']['order_type']},
            'command': 'receiveNewOrder'
        }))
    

    def sendNewItem(self, data):
        return self.send(json.dumps({
            'item':{'name' : data['data']['name']} , 
            'command':'dispatchreceiveNewItem'
        }))


    def sendOrderCompleted(self, data):
        return self.send(json.dumps({
            'order_id': data['data'],
            'command': 'reveiveOrderCompleted'
        }))
