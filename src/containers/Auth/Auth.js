import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import validator from "validator";
import * as actions from "../../store/actions/index";
import {connect} from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        value: ""
      },
    },
    isSignUp: true
  };

  componentDidMount() {
    if(!this.props.building) {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthenticateHandler = () => {
    this.setState(prevState => {
        return {
          isSignUp: !prevState.isSignUp
        }
    })
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            touched: true,
            valid: this.inputValidityChecker(event.target.value, this.state.controls[controlName].validation)
        }
    }
    this.setState({controls : updatedControls});
  }

  inputValidityChecker(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      isValid = validator.isEmail(value) && isValid;
    }
    
    return isValid;
  }


  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangeHandler(event, formElement.id)}
        />
      );
    });

    if(this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
      {errorMessage}
      {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthenticateHandler} btnType="Danger">SWITCH TO {this.state.isSignUp ? "SIGN IN" : "REGISTER"}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth : state.auth.tokenId !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email,password, isSignUp) => dispatch(actions.auth(email,password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
