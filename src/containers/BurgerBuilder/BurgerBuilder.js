import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as Actions from "../../store/actions/index";



class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // purchasable: false,
      purchaseMode: false,
      // loading: false,
      // error: false
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
    // console.log(this.props);
  //   axios
  //     .get("https://my-react-burger-5ea60.firebaseio.com/ingredients.json")
  //     .then(response => this.setState({ ingredients: response.data }))
  //     .catch(error => this.setState({error: true}));
  // 
}

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, nextEl) => sum + nextEl);
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuth) {
      this.setState({ purchaseMode: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchaseMode: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])) 
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryStrings = queryParams.join("&");

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryStrings
    // });
    this.props.onPurchasedInit();
    this.props.history.push("/checkout");
  };

  // addIngredient = type => {
  //   const countIngredient = this.state.ingredients[type] + 1;
  //   const newIngredients = { ...this.state.ingredients };
  //   newIngredients[type] = countIngredient;
  //   const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
  //   this.setState({ totalPrice: newPrice, ingredients: newIngredients });
  //   this.updatePurchaseState(newIngredients);
  // };

  // removeIngredient = type => {
  //   if (this.state.ingredients[type] <= 0) {
  //     return;
  //   }
  //   const countIngredient = this.state.ingredients[type] - 1;
  //   const newIngredients = { ...this.state.ingredients };
  //   newIngredients[type] = countIngredient;
  //   const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({ totalPrice: newPrice, ingredients: newIngredients });
  //   this.updatePurchaseState(newIngredients);
  // };

  render() {
    const disabledInfo = { ...this.props.ing };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }


    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;

    if (this.props.ing) {
      burger = (
        <>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            isAuth={this.props.isAuth}
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          totalPrice={this.props.totalPrice}
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <>
        <Modal show={this.state.purchaseMode} hide={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    totalPrice : state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.tokenId !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(Actions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(Actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(Actions.initIngredients()),
    onPurchasedInit : () => dispatch(Actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
