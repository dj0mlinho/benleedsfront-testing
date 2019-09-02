import React from "react";
import axios from "axios";
import qs from "qs";

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

  async componentDidMount() {
    if (window.location.pathname === "/login") {
      const response = await axios.get(process.env.REACT_APP_API_URL);
      const buildings = response.data.buildings;
      localStorage.setItem("buildings", JSON.stringify(buildings));
    }
  }
  doSubmit = async () => {
    const { data } = this.state;

    this.setState({
      isLoading: true
    });

    const params = {
      email: data.email,
      password: data.password
    };

    const { data: response } = await axios.post(
      process.env.REACT_APP_API_URL + "/login",
      qs.stringify(params)
    );

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
        const currentUser = {
          emailPassword: response.user.emailPassword,
          name: response.user.name,
          email: response.user.email,
          imgPath: response.user.imgPath,
          password: response.user.password,
          region: response.user.region,
          _id: response.user._id
        };

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
            <img src={logo} className="img-fluid" alt="Ben Leeds Logo" />
          </div>
          <h1 className="p-3">Log-In</h1>
          <form
            className="col-8 offset-2 text-center"
            onSubmit={this.handleSubmit}
          >
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Submit", this.state.isLoading)}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
