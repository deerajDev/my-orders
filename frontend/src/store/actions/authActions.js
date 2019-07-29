import {
    REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT,
    LOAD_ITEMS, FILTER_ITEMS, NEW_ORDER,
    ORDER_PLACED, PENDING_ORDERS,
    CREATE_ITEM, RECEIEVE_NEW_ITEM,
    RECEIEVE_NEW_ORDER, RECEIEVE_ORDER_COMPLETED,
    SEND_ORDER_COMPLETED,
    NOTIFY,
} from './types'
import axios from 'axios';



const register = ({ email, password, shop_name }) => (dispatch) => {
    const body = JSON.stringify({ email, password, shop_name })
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    axios.post('http://127.0.0.1:8000/api/accounts/register', body, config)
        .then(res => {
            const user = {
                'isOwner': true,
                'isAuthenticated': true,
                'token': 'o4857293874'
            }
            const shop = { ...res.data.shop }
            dispatch({
                type: REGISTER_SUCCESS,
                payload: { user, shop }
            })

        })
        .catch(err => console.log(err.data))
}


const loginOwner = ({ email, password }) => dispatch => {
    const body = JSON.stringify({ email, password })
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    axios.post('http://127.0.0.1:8000/api/accounts/login/owner', body, config)
        .then(res => {
            const user = {
                'isOwner': true,
                'isAuthenticated': true,
            }
            const shop = { shop_name: res.data.shop.shop_name, shop_id: res.data.shop.shop_id }
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user, shop }
            })

        })
        .catch(err => {
            const message_type = 'error'
            const message = 'Incorrect Credentials'
            dispatch({
                type: NOTIFY,
                payload: { message_type, message }
            })
        })
}


const loginStaff = ({ shop_name, shop_id }) => dispatch => {
    const body = JSON.stringify({ shop_name, shop_id })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('http://127.0.0.1:8000/api/accounts/login/staff', body, config)
        .then(res => {
            const user = {
                'isOwner': false,
                'isAuthenticated': true,
            }
            const shop = { shop_name, shop_id }

            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user, shop }
            })
            dispatch({
                type: NOTIFY,
                payload: { message_type: 'success', message: 'You are authenticated' }
            })
        })
        .catch(err => {
            const message_type = 'error'
            const message = 'Incorrect Credentials'
            dispatch({
                type: NOTIFY,
                payload: { message_type, message }
            })
        })
}


const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}



export {
    register,
    loginOwner,
    loginStaff,
    logoutUser,

}