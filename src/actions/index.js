import * as types from './../constants/types.js'
export const setUserStore = authUser => ({
    type: types.SET_USER_STORE,
    authUser
})

export const setSessionStore = authUser => ({
    type: types.SET_SESSION_STORE,
    authUser
})

//Customer
export const initCustomer = customers => ({
    type: types.INIT_CUSTOMER,
    customers
})
export const listALLCustomer = () => {
    return {
        type: types.LIST_CUSTOMER,
    }
}
export const addCustomer = (index, customer) => ({
    type: types.ADD_CUSTOMER,
    customer,
    index
})

//Product
export const initProduct = products => ({
    type: types.INIT_PRODUCT,
    products
})