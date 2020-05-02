import * as types from './../constants/types';
import { firebase } from './../firebase';
const initState = [];

const myProducer = (state = initState, action) => {
    switch (action.type) {
        case types.INIT_CUSTOMER: {
            state = action.customers;
            return state;
        }
           
        case types.LIST_CUSTOMER:
            return state;
        case types.ADD_CUSTOMER:{
            let rs = [].concat(state);
            rs[action.index] = action.customer;
            firebase.update(`Customer/${action.index}`, action.customer);
            return rs
        }
            
        default:
            return state
    }
  }
  
  export default myProducer