import { combineReducers } from 'redux';
import sessionStore from './sessionStore';
import userStore from './userStore';
import customerStore from './customer';
import productStore from './product';
export default combineReducers({
    sessionStore,
    userStore,
    customerStore,
    productStore
})