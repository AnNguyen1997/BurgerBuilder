import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  // componentWillMount() {
  //   this.queryHandler();
  // }

  // queryHandler = () => {
  //   let fetchIngredients = {};
  //   let price = 0;
  //   const query = new URLSearchParams(this.props.location.search);
  //   for (let params of query.entries()) {
  //     if (params[0] === "price") {
  //         price = params[1];
  //     } else {
  //       fetchIngredients[params[0]] = parseInt(params[1], 10);
  //     }
  //   }
  //   this.setState({ ingredients: fetchIngredients, totalPrice: price });
  // };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ing}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            // render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;

  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
