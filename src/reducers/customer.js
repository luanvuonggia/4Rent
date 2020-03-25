const initState = [];
const myProducer = (state = initState, action) => {
    switch (action.type) {
        case 'LIST_ALL':
            return state;
        case 'ADD':
            return state;
        default:
            return state
    }
  }
  
  export default myProducer