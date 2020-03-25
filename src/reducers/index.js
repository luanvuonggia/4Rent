import { combineReducers } from 'redux'
import sessionStore from './sessionStore'
import userStore from './userStore'

export default combineReducers({
    sessionStore,
    userStore
})