
import { combineReducers } from 'redux';
import authReducer from './authReducers';
import itemsReducer from './ItemsReducer';

const rootReducer = combineReducers({
    authReducer,
    itemsReducer
})

export default rootReducer