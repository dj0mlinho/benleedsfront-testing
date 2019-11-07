import React, { Component } from "react";
import "./App.css";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./admin/containers/Login/Login";
import ProfilePage from "./user/containers/ProfilePage/ProfilePage";
import NewWorkorderForm from "./user/containers/NewWorkorderForm/NewWorkorderForm";
import MakeReadyPage from "../src/user/containers/MakeReadyPage/MakeReadyPage";
import FullRoomPage from "../src/user/containers/FullRoomPage/FullRoomPage";
import WorkorderPage from "./user/components/WorkorderPage/WorkorderPage";
import ReportsPage from "./user/components/ReportsPage/ReportsPage";
import Spinner from "../src/admin/components/Ui/Spinner/Spinner";

import { refreshInit, loadingEnd } from "../src/store/actions/allActions";

import FirstPage from "./admin/containers/FirstPage/FirstPage";
import LayoutContainer from "./admin/containers/LayoutContainer/LayoutContainer";
import Report from "./admin/containers/Report/Report";
import UsersPage from "./admin/containers/Users/UsersPage";
import Vendors from "./admin/containers/Vendors/Vendors";
import Vendor from "./admin/containers/Vendor/Vendor";
import User from "./admin/containers/User/User";
import Items from "./admin/containers/Items/Items";

toast.configure();

export class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("usao");
      this.props.onRefresh(token);
    } else {
      this.props.onEnd();
    }
  }

  render() {
    let protectRoutes = null;

    if (this.props.error) {
      toast.error(this.props.error);
    }

    if (this.props.loading) {
      protectRoutes = <Spinner />;
    } else {
      protectRoutes = (
        <Switch>
          <Route path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      );

      //// admin route
      if (this.props.type === "admin") {
        protectRoutes = (
          <LayoutContainer>
            <Switch>
              <Route path="/vendors/:id" component={Vendor} />
              <Route path="/report/:id" component={Report} />
              <Route path="/users/:id" component={User} />
              <Route
                path="/users"
                render={props => <UsersPage pageName="Users" {...props} />}
              />
              <Route
                path="/vendors"
                render={props => <Vendors pageName="Vendors" {...props} />}
              />
              <Route
                path="/items"
                render={props => (
                  <Items pageName="Under construction :)" {...props} />
                )}
              />
              <Route
                path="/"
                render={props => (
                  <FirstPage pageName="Reports List" {...props} />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </LayoutContainer>
        );
      }

      //// user route
      if (this.props.type === "user") {
        protectRoutes = (
          <Switch>
            {/* <Route path="/:id/reports/:r" component={ReportsPage} /> */}
            <Route path="/:id/workorder" component={WorkorderPage} />
            <Route path="/room/:id/:m" component={FullRoomPage} />
            <Route path="/:id/rooms" component={MakeReadyPage} />

            <Route path="/new" component={NewWorkorderForm} />
            <Route path="/:id" exact component={NewWorkorderForm} />

            <Route path="/" component={ProfilePage} />
          </Switch>
        );
      }
    }

    return <div className="App">{protectRoutes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    userId: state.userId,
    type: state.type,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRefresh: token => dispatch(refreshInit(token)),
    onEnd: () => dispatch(loadingEnd())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
