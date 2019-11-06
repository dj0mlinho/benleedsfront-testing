import React, { Component } from "react";
import axios from "axios";
import styles from "./ProfilePage.module.css";
import logo from "../../img/ben-leeds-logo.png";
import { currentUserEndpoint } from "../../services/http";
import Button from "../../components/Buttons/Buttons.jsx";

import ImageProfile from "../../components/UI/ImageProfile/ImageProfile";
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

    this.setState({ data: data.data });
  };
  // handleSignOut() {
  //   console.log("clear");
  //   localStorage.clear();
  // }
  handleButtonClick = button => {
    if (button == "New") {
      this.props.history.push("/new");
    }
  };
  render() {
    const data = this.state.data;
    const buttons = this.state.buttons;

    return (
      <div className={styles.Profile}>
        <img src={logo}></img>
        <div className="row">
          <div className="col-sm-4 offset-sm-4 mt-3">
            {data ? (
              <ImageProfile
                imageUrl={data.imageUrl}
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
                click={() => this.handleButtonClick(button)}
                style={styles.Buttons}
              >
                {button}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
