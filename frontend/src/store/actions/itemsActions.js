import {
    LOAD_ITEMS, FILTER_ITEMS, NEW_ORDER,
    ORDER_PLACED, PENDING_ORDERS,
    CREATE_ITEM, RECEIEVE_NEW_ITEM,
    RECEIEVE_NEW_ORDER, RECEIEVE_ORDER_COMPLETED,
    SEND_ORDER_COMPLETED,
    NOTIFY,
} from './types'
import axios from 'axios';







const getItems = () => dispatch => {
    const id = localStorage.getItem("shop_id")
    axios.get(`http://127.0.0.1:8000/api/items/${id}`)
        .then(res => dispatch({
            type: LOAD_ITEMS,
            payload: res.data
        }))
        .catch(err => {
            const message_type = 'error'
            const message = 'could not get your items'
            dispatch({
                type: NOTIFY,
                payload: { message_type, message }
            })
        })
}


const filterItems = (input_element) => dispatch => {
    dispatch({
        type: FILTER_ITEMS,
        payload: input_element.target.value.toLowerCase()
    })

}

const makeOrder = (item_name, item_id, order_type, description) => dispatch => {
    dispatch({
        type: NEW_ORDER,
        payload: { item_name, item_id, order_type, description }
    })
}

const orderPlaced = () => dispatch => {
    dispatch({
        type: ORDER_PLACED
    })
}

const sendOrderCompleted = (order_id) => dispatch => {
    dispatch({
        type: SEND_ORDER_COMPLETED,
        payload: order_id
    })
}

const pendingOrders = (pending_orders) => dispatch => {
    dispatch({
        type: PENDING_ORDERS,
        payload: pending_orders.order_data
    })
}

const dispatchreceiveNewOrder = (new_order) => dispatch => {
    dispatch({
        type: RECEIEVE_NEW_ORDER,
        payload: new_order['order']

    })
}
const dispatchreceiveNewItem = (item) => dispatch => {

    dispatch({
        type: RECEIEVE_NEW_ITEM,
        payload: item['item_info']

    })
}

const dispatchorderCompleted = (order) => dispatch => {
    dispatch({
        type: RECEIEVE_ORDER_COMPLETED,
        payload: order.order_id

    })
}

const createItem = (item_name, cost) => dispatch => {
    dispatch({
        type: CREATE_ITEM,
        payload: { item_name, cost }
    })
}


const notifyUser = (message_data) => dispatch => {
    const message_type = message_data['message_type']
    const message = message_data['message']
    dispatch({
        type: NOTIFY,
        payload: { message_type, message }
    })
}





export {
    getItems,
    filterItems,
    makeOrder,
    orderPlaced,
    pendingOrders,
    createItem,
    sendOrderCompleted,
    dispatchreceiveNewItem,
    dispatchreceiveNewOrder,
    dispatchorderCompleted,
    notifyUser,

}