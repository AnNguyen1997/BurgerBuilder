import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
    //HOW TO TURN AN KEY-VALUE PAIR OBJECT INTO A ARRAY TO BE RENDERED AS LIST 
    //1. Extract keys from ingredients props into the array of keys
    let ingredientsArr = Object.keys(props.ingredients)
        .map(igKey => {
            //2. Array(number) returns a new EMPTY JavaScript array with its length property set to that number. WHen COPY from this array, the new array has the same length with UNDEFINED elements
            return [...Array(props.ingredients[igKey])].map(( _, index ) => {
                return <BurgerIngredient key={igKey + index} type={igKey}/>
            });
        }).reduce((arr, el) => { return arr.concat(el)}, []); //Concat into one array
    if(ingredientsArr.length === 0) {
        ingredientsArr = <p>Please Select Your Ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArr}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;