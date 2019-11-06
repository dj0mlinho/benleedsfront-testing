import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styles from "./ProfilePage.module.css";
import logo from "../../img/ben-leeds-logo.png";
import { currentUserEndpoint, reportsEndpoint } from "../../services/http";
import Button from "../../components/Buttons/Buttons.jsx";

import ImageProfile from "../../components/UI/ImageProfile/ImageProfile";
import ReportsPage from "../../components/ReportsPage/ReportsPage";
class ProfilePage extends Component {
  state = {
    buttons: ["New", "To Do Units", "Pending Reports", "Sent Reports"]
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    const { data: data } = await axios.get(currentUserEndpoint, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    localStorage.setItem("loginTime", new Date().getTime());
    console.log("jebenidata", data);
    const id = data.data._id;
    const { data: resReports } = await axios.get(
      reportsEndpoint + `?user=${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    const allReports = resReports.data;
    console.log(allReports);

    this.setState({ data: data.data, allReports });
  };
  // handleSignOut() {
  //   console.log("clear");
  //   localStorage.clear();
  // }
  handleReportOptions = button => {
    const data = this.state.data;
    const id = data._id;
    const allReports = [...this.state.allReports];
    let reports = [];
    if (button == "New") {
      this.props.history.push("/new");
    }
    if (button == "Sent Reports") {
      button = "sent";

      reports = allReports.filter(report => report.adminStatus == "sent");

      this.props.history.push(`/${id}/reports/${button}`);
    }
    if (button == "Pending Reports") {
      button = "pending";

      reports = allReports.filter(report => report.adminStatus == "pending");

      this.props.history.push(`/${id}/reports/${button}`);
    }
    if (button == "To Do Units") {
      this.props.history.push("/new");
    }
    this.setState({ reports });
  };
  render() {
    console.log(this.state.reports);
    const data = this.state.data;
    const buttons = this.state.buttons;

    return (
      <div className={styles.Profile}>
        <img src={logo}></img>
        <div className="row">
          <div className="col-sm-4 offset-sm-4 mt-3">
            {data ? (
              <ImageProfile
                imageUrl={"uploads/" + data.photo}
                name={data.name}
                region={data.region}
              ></ImageProfile>
            ) : null}
          </div>
          <div className="col-sm-4 mt-3">
            <button className="btn btn-danger" onClick={this.handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            {buttons.map(button => (
              <Button
                key={button}
                click={() => this.handleReportOptions(button)}
                style={styles.Buttons}
              >
                {button}
              </Button>
            ))}
          </div>
        </div>
        {/* {this.state.reports ? ( */}
        <Route
          render={props => (
            <ReportsPage reports={this.state.reports} {...props} />
          )}
          path="/:id/reports/:r"
        />
        {/* ) : null} */}
      </div>
    );
  }
}

export default ProfilePage;
