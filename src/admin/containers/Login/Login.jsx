import React, { Component } from "react";
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button/Button";
import { connect } from "react-redux";
import { loginInit } from "../../../store/actions/allActions";
import { Redirect, withRouter } from "react-router-dom";
import logo from "../../../user/img/ben-leeds-logo.png";

import styles from "./Login.module.css";

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    // this.history.push("/mamuTI");
  }

  handleInputChange = e => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  onSubmitUser = (e, email, password, loginProps) => {
    e.preventDefault();
    console.log("usao jbt");
    this.props.onSubmit(email, password, loginProps);
  };

  render() {
    return (
      <form
        onSubmit={e =>
          this.onSubmitUser(
            e,
            this.state.email,
            this.state.password,
            this.props
          )
        }
        className={styles.Login}
      >
        <div className={styles.Logo}>
          <img className="img-fluid" src={logo} alt="logo" />
        </div>
        <Input
          type="text"
          label="Your Email:"
          name="email"
          value={this.state.email}
          changed={this.handleInputChange}
        />
        <Input
          type="password"
          name="password"
          label="Your Password:"
          value={this.state.password}
          changed={this.handleInputChange}
        />
        <div
          className={
            this.props.error
              ? styles.errorDiv + " " + styles.errorMsg
              : styles.errorDiv
          }
        >
          {this.props.error ? this.props.error : "msg"}
        </div>
        <Button btnColor={"ButtonGrey"}>Login</Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password, loginProps) =>
      dispatch(loginInit(username, password, loginProps))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
