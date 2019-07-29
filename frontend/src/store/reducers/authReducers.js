import {
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT,
    NOTIFY,

} from '../actions/types'



const intitalState = {
    isLoading: false,
    user: {
        isOwner: localStorage.getItem('isOwner'),
        isAuthenticated: localStorage.getItem('isAuthenticated')
    },
    shop: {
        shop_id: localStorage.getItem('shop_id'),
        shop_name: localStorage.getItem('shop_name')
    },
    message_object: {
        message_type: '',
        message: ''
    }
}


export default function (state = intitalState, action) {
    const new_state = { ...state }
    switch (action.type) {

        case REGISTER_SUCCESS:
            new_state.isLoading = false
            setUserLocalStorage(action.payload)
            return {
                ...new_state,
                user: {
                    ...new_state.user,
                    isAuthenticated: localStorage.getItem('isAuthenticated'),
                    isOwner: localStorage.getItem('isOwner')
                },
                shop: {
                    ...new_state.shop,
                    name: localStorage.getItem('shop_name'),
                    shop_id: localStorage.getItem('shop_id')
                }
            }



        case REGISTER_FAIL:
            return intitalState


        case LOGIN_SUCCESS:
            new_state.isLoading = false
            setUserLocalStorage(action.payload)
            return {
                ...new_state,
                user: {
                    ...new_state.user,
                    isAuthenticated: localStorage.getItem('isAuthenticated'),
                    isOwner: localStorage.getItem('isOwner')
                },
                shop: {
                    ...new_state.shop,
                    shop_name: localStorage.getItem('shop_name'),
                    shop_id: localStorage.getItem('shop_id')
                }
            }


        case LOGOUT:
            cleanLocalStorage()
            return {
                ...new_state,
                user: {
                    ...new_state.user,
                    isOwner: false,
                    isAuthenticated: false
                },


                shop: {
                    ...new_state.shop,
                    shop_id: '',
                    shop_name: ''
                }

            }



        case NOTIFY:
            return {
                ...new_state,
                message_object: {
                    ...new_state.message_object,
                    message_type: action.payload.message_type,
                    message: action.payload.message
                }
            }

        default:
            return new_state
    }
}



const setUserLocalStorage = payload => {
    localStorage.setItem('isAuthenticated', true)
    localStorage.setItem('isOwner', payload.user.isOwner)
    localStorage.setItem('shop_name', payload.shop.shop_name)
    localStorage.setItem('shop_id', payload.shop.shop_id)

}

const cleanLocalStorage = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('isOwner')
    localStorage.removeItem('shop_name')
    localStorage.removeItem('shop_id')

}








//    cleanLocalStorage()
//             return {
//                 ...new_state,
//                 user: {
//                     ...new_state.user,
//                     isOwner: false,
//                     isAuthenticated: false
//                 },
//                 shop: {
//                     ...new_state.shop,
//                     name: '',
//                     shop_id: ''
//                 }

//             }