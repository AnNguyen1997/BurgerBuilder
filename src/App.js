import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Order";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onTryLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <div>
          <Layout>{routes}</Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToprops = state => {
  return {
    isAuthenticated: state.auth.tokenId !== null
  };
};

const mapDisptachToProps = dispatch => {
  return {
    onTryLogin: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToprops,
  mapDisptachToProps
)(App);
