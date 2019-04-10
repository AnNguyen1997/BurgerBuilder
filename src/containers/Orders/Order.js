import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios";
import {connect} from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }
    componentDidMount() {
    //     axios.get("/orders.json")
    //     .then(res => {
    //         let orders = [];
    //         console.log(res.data);
    //         for (let key in res.data) {
    //             orders.push({
    //                 ...res.data[key],
    //                 id : key
    //             })
    //         }
    //         this.setState({loading: false, orders: orders});
    //         console.log(this.state.orders);
    //     })
    //     .catch(err => this.setState({loading: false}));
    this.props.onFetchOrders(this.props.token, this.props.userId);
 }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = (this.props.orders.map(order => {
                return (<Order key={order.id} ingredients={order.ingredients} totalPrice={order.price}/>)
            }));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));