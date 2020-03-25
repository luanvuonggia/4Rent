
export const setUserStore = authUser => ({
    type: 'SET_USER_STORE',
    authUser
})

export const setSessionStore = authUser => ({
    type: 'SET_SESSION_STORE',
    authUser
})