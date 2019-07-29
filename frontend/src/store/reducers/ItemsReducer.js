import {
    LOAD_ITEMS, FILTER_ITEMS, NEW_ORDER, ORDER_PLACED,
    PENDING_ORDERS, CREATE_ITEM, RECEIEVE_NEW_ITEM, RECEIEVE_NEW_ORDER,
    RECEIEVE_ORDER_COMPLETED, SEND_ORDER_COMPLETED
} from '../actions/types'




const initialState = {
    items: [],
    filtered_items: [],
    new_order: null,
    recent_completed_order: null,
    created_item: { item_name: '', cost: 0 },
    pending_orders: [],
}


export default function (state = initialState, action) {

    const new_state = { ...state }
    switch (action.type) {

        case LOAD_ITEMS:
            return {
                ...new_state,
                items: [...action.payload],
                filtered_items: [...action.payload]
            }

        case CREATE_ITEM:
            return {
                ...new_state,
                created_item: action.payload
            }


        case FILTER_ITEMS:
            if (action.payload.length < 1) {
                return {
                    ...new_state,
                    filtered_items: [...new_state.items]
                }
            }
            else {
                return {
                    ...new_state,
                    filtered_items: [...new_state.items.filter(item => (item.name.toLowerCase().includes(action.payload)))]
                }
            }



        case PENDING_ORDERS:
            return {
                ...new_state,
                pending_orders: [...action.payload]
            }


        case NEW_ORDER:
            return {
                ...new_state,
                new_order: action.payload
            }

        case ORDER_PLACED:
            return {
                ...new_state,
                new_order: null
            }

        case SEND_ORDER_COMPLETED:
            return {
                ...new_state,
                recent_completed_order: action.payload
            }

        case RECEIEVE_NEW_ITEM:

            return {
                ...new_state,
                items: [...new_state.items, action.payload],
                filtered_items: [...new_state.items, action.payload]
            }

        case RECEIEVE_NEW_ORDER:
            return {
                ...new_state,
                pending_orders: [...new_state.pending_orders, action.payload]
            }


        case RECEIEVE_ORDER_COMPLETED:
            return {
                ...new_state,
                pending_orders: [...new_state.pending_orders.filter(order => (order.id != action.payload))]
            }


        default:
            return new_state
    }

}

