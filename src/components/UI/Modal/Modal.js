import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} hide={this.props.hide} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translate(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
