const initState = {
  authUser : null,

}
const sessionStore = (state = initState, action) => {
    switch (action.type) {
      case 'SET_SESSION_STORE':
        state = {authUser: action.authUser}
        return state
      default:
        return state
    }
  }
  
  export default sessionStore
  