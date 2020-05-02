import * as types from './../constants/types';
const initState = [];

const myProducer = (state = initState, action) => {
    switch (action.type) {
        case types.INIT_PRODUCT: {
            state = action.products;
            return state;
        }

        case types.ADD_PRODUCT:
            return state;
        default:
            return state
    }
  }
  
  export default myProducer