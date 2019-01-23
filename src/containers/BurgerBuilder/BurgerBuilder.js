import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 1
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      purchasable: false,
      purchaseMode: false,
      totalPrice: 4
    };
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, nextEl) => sum + nextEl);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchaseMode: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchaseMode: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ purchaseMode: false });
  };

  addIngredient = type => {
    const countIngredient = this.state.ingredients[type] + 1;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = countIngredient;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePurchaseState(newIngredients);
  };

  removeIngredient = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const countIngredient = this.state.ingredients[type] - 1;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = countIngredient;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePurchaseState(newIngredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal show={this.state.purchaseMode} hide={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice} 
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
