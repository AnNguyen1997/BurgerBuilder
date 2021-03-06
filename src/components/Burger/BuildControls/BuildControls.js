import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
    <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl 
        add={() => props.addIngredient(ctrl.type)}
        remove={() => props.removeIngredient(ctrl.type)}
        key={ctrl.label} 
        label={ctrl.label} 
        disabled={props.disabled[ctrl.type]}/>
      ))}
      <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth ? "ORDER NOW!" : "SIGN IN TO ORDER"}</button>
    </div>
  );
};

export default buildControls;
