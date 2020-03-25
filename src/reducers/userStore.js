const userStore = (state = null, action) => {
    switch (action.type) {
      case 'SET_USER_STORE':
        state = action.authUser;
        return state       
      default:
        return state
    }
  }
  
  export default userStore