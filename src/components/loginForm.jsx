import React from "react";
import axios from "axios";
import qs from "qs";
import { Redirect, Route } from "react-router-dom";
import logo from "../img/ben-leeds-logo.png";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    response: {},
    schema: {
      email: Joi.string()
        .required()
        .label("Email"),
      password: Joi.string()
        .required()
        .label("Password")
    },
    isLoading: false
  };

  doSubmit = async () => {
    const { data } = this.state;

    this.setState({
      isLoading: true
    });

    const params = {
      email: data.email,
      password: data.password
    };

    console.log(params);
    const { data: response } = await axios.post(
      process.env.REACT_APP_API_URL + "/login",
      qs.stringify(params)
    );

    // localStorage.setItem(
    //   "completedWorkorders",
    //   JSON.stringify(response.workorders)
    // );
    // localStorage.setItem(
    //   "savedWorkorders",
    //   JSON.stringify(response.tempWorkorders)
    // );

    console.log(response);

    if (response.error === "no email" || response.error === "bad password") {
      const errors = { ...this.state.errors };
      if (response.error === "no email") {
        errors.email = "Email not found";
        this.setState({ errors, isLoading: false });
      }
      if (response.error === "bad password") {
        errors.password = "Wrong password";
        this.setState({ errors, isLoading: false });
      }
    } else {
      if (response === "admin") {
        localStorage.setItem("admin", JSON.stringify(data));
        this.props.history.push(`./admin`);
      } else {
        console.log(response.user);
        const currentUser = {
          name: response.user.name,
          email: response.user.email,
          password: response.user.password,
          region: response.user.region,
          _id: response.user._id
        };
        // console.log(user);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.removeItem("building");
        localStorage.removeItem("startBtn");
        localStorage.removeItem("chosenOpt");
        localStorage.removeItem("isLoadingFullRoom");
        const user = response.user._id;
        const workorder = {
          loginTime: new Date(),

          // completedTime: "",
          apartmentNumber: "",
          // sendTime: "",
          userId: user,
          buildingNumber: "",

          jobs: []
        };
        localStorage.setItem("workorder", JSON.stringify(workorder));
        const { state } = this.props.location;
        this.props.history.push(`./rooms/${response.user.region}`);
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-5 mx-auto m-5  text-center login">
          <div className="m-5">
            <img
              src={logo}
              className="img-fluid logo-img"
              alt="Ben Leeds Logo"
            />
          </div>
          <h1 className="p-3">Log-In</h1>
          <form
            className="col-8 offset-2 text-center"
            onSubmit={this.handleSubmit}
          >
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Submit", this.state.isLoading)}
            {/* <button class="btn btn-primary" type="button" enabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
              <span class="sr-only">Loading...</span>
            </button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
