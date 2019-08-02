import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "./components/loginForm";
import axios from "axios";
import Rooms from "./components/rooms";
import Workorders from "./components/workorders";

import FullRoom from "./components/fullRoom";
import Wo from "./components/workorder1";
import ProtectedRoute from "./components/common/protectedRoute";
//// bootstrap and custom css
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";

import "./App.css";

//// import of cutom components
import AdminPanel from "./components/adminPanel";
import Users from "./components/users";
import User from "./components/user";
import Vendors from "./components/vendors";
import Vendor from "./components/vendor";
import Items from "./components/items";
import WorkOrder from "./components/workOrder";
import Jobs from "./components/jobs";

class App extends Component {
  state = {};
  async componentDidMount() {
    console.log(window.location);
    if (window.location.pathname === "/login") {
      const response = await axios.get(process.env.REACT_APP_API_URL);
      const buildings = response.data.buildings;
      localStorage.setItem("buildings", JSON.stringify(buildings));
      console.log(response);
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <ProtectedRoute path="/admin/workorder/:id" component={WorkOrder} />{" "}
          <ProtectedRoute path="/admin/users/:id" component={User} />{" "}
          <ProtectedRoute path="/admin/users" component={Users} />{" "}
          <ProtectedRoute path="/admin/vendor/:id" component={Vendor} />{" "}
          <ProtectedRoute path="/admin/vendors" component={Vendors} />{" "}
          <ProtectedRoute path="/admin/items" component={Items} />{" "}
          <ProtectedRoute path="/admin/jobs" component={Jobs} />{" "}
          <ProtectedRoute path="/admin" component={AdminPanel} />{" "}
          <Route
            path="/user/workorders/:i"
            render={props => <Workorders props={this.state.rooms} {...props} />}
          />
          <Route
            path="/:id/:m/work-order"
            render={props => <Wo props={this.state.rooms} {...props} />}
          />
          <Route path="/rooms/:id/:m" component={FullRoom} />{" "}
          <Route path="/rooms/:id" render={props => <Rooms {...props} />} />
          <Route path="/login" component={LoginForm} />{" "}
          <Redirect from="/" exact to="/login" />
        </Switch>{" "}
      </div>
    );
  }
}

export default App;
