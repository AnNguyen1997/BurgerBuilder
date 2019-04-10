import *  as actionTypes from "./actionTypes";
import axios from "../../axios";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + token, orderData)
        .then(response => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))
        .catch(error => dispatch(purchaseBurgerFail(error)));
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_START,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        dispatch(fetchOrderStart());
        axios.get("/orders.json" + queryParams)
        .then(res => {
            let orders = [];
            for (let key in res.data) {
                orders.push({
                    ...res.data[key],
                    id : key
                })
            }
            dispatch(fetchOrderSuccess(orders));
        })
        .catch(err => dispatch(fetchOrderFailed(err)));
    }

}

