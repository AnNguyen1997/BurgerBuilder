import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <>
    <Backdrop show={props.show} hide={props.hide}/>
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translate(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
  </>
);

export default modal;
