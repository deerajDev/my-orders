import React, { Component } from 'react'
import { connect } from 'react-redux';
import Websocket from 'react-websocket';

import {
    pendingOrders, orderPlaced, dispatchreceiveNewOrder,
    dispatchorderCompleted, dispatchreceiveNewItem,
    notifyUser
} from '../../store/actions/itemsActions'



class Chat extends Component {
    callBacks = {
        receivePendingOrders: this.props.pendingOrders,
        receiveNewOrder: this.props.dispatchreceiveNewOrder,
        reveiveOrderCompleted: this.props.dispatchorderCompleted,
        dispatchreceiveNewItem: this.props.dispatchreceiveNewItem,
        notifyUser: this.props.notifyUser,


    }

    componentWillReceiveProps(new_props, new_state) {
        if (new_props.new_order) {
            this.sendNewOrder(new_props.new_order)
            return this.props.orderPlaced()

        }


        else if (this.props.created_item.item_name !== new_props.created_item.item_name) {
            return this.sendNewItem(new_props.created_item)
        }
        else if (this.props.recent_completed_order !== new_props.recent_completed_order) {
            return this.sendOrderCompleted(JSON.stringify(new_props.recent_completed_order))
        }
    }



    //websocket methods

    onOpen = () => {

        // this.loadPendingOrders()
    }
    //methods which sends data to the server

    sendMessage = (msg) => {
        this.refWebsocket.sendMessage(JSON.stringify(msg))
    }

    sendNewItem(data) {
        this.sendMessage(JSON.stringify({
            'command': 'newItem',
            'data': data
        }))
    }


    sendNewOrder(data) {
        this.sendMessage(JSON.stringify({
            'command': 'newOrder',
            'data': data
        }))
    }



    sendOrderCompleted(data) {
        this.sendMessage(JSON.stringify({
            'command': 'orderCompleted',
            'data': data
        }))
    }



    //methods which revieve data from the server


    onMessage = (data) => {
        const parsed_data = JSON.parse(data)
        this.callBacks[parsed_data['command']](parsed_data)


    }




    receivePendingOrders(pending_orders) {
        const order_ids = pending_orders['order_ids']
        const order_info = pending_orders['order_info']
        const hashMap = new Map()
        for (let index = 0; index < order_ids.length; index++) {

            hashMap.set(order_ids[index], order_info[index])
        }
        this.pendingOrders(hashMap)
    }





    render() {
        if (this.props.shop_id) {
            return (
                <div>
                    <Websocket
                        url={`ws://localhost:8000/ws/chat/${this.props.shop_id}`}
                        onMessage={this.onMessage}
                        onOpen={this.onOpen}
                        reconnect={true}
                        ref={Websocket => {
                            this.refWebsocket = Websocket
                        }}

                    />

                </div>
            )
        }
        else {
            return null
        }
    }
}
const mapStateToProps = state => ({
    new_order: state.itemsReducer.new_order,
    created_item: state.itemsReducer.created_item,
    recent_completed_order: state.itemsReducer.recent_completed_order,
    shop_id: state.authReducer.shop.shop_id,
})


export default connect(mapStateToProps,
    {
        pendingOrders, orderPlaced,
        dispatchreceiveNewOrder, dispatchorderCompleted,
        dispatchreceiveNewItem, notifyUser
    })(Chat)

