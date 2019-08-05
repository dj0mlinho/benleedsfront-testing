import React, { Component } from "react";
import axios from "axios";
import "../css/navbar.css";
import logo from "../img/ben-leeds-logo.png";
import user from "../img/user.jpg";
import WorkOrder from "./workOrder";
import { BrowserRouter } from "react-router-dom";

class NavBar extends Component {
  state = {
    data: [],
    value: "",
    showing: true
  };

  async componentDidMount() {
    const userId = "5d42f45141318e15a443b260";
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/avatar/${userId}`,
      { responseType: "arraybuffer" }
    );

    console.log("resonse", response);
    // this.setState({ img });
    // console.log(img);
    const base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    console.log(base64);
    this.setState({ source: "data:;base64," + base64 });
  }
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      this.props.history.push(`/`);
      // window.location = `/`;
    }
  }
  handleWorkorders = async e => {
    if (e.target.value == "saved") {
      e.preventDefault();
      e.persist();
      let userId = JSON.parse(localStorage.getItem("currentUser"))._id;
      // let workorders = JSON.parse(localStorage.getItem("savedWorkorders"));

      // console.log(userId);
      // let workorders = JSON.parse(localStorage.getItem("savedWorkorders"));
      // let workorders1 =
      const data = await axios.get(
        process.env.REACT_APP_API_URL + `/user/getAllTempWorkorders/${userId}`
      );
      console.log(data);
      localStorage.setItem("savedWorkorders", JSON.stringify(data.data));
      localStorage.setItem("workorders", JSON.stringify(data.data));
      localStorage.setItem("chosenOpt", JSON.stringify("saved"));
      // console.log(workorders1);
      // workorders = data;
      // window.alert("In development...");
      // let value = "saved";
      this.props.history.push(`/user/workorders/${e.target.value}`);
      // document.location.reload();
      document.location.reload();
    } else if (e.target.value == "pending") {
      // let userId = JSON.parse(localStorage.getItem("savedWorkorders")).userId;
      e.preventDefault();
      e.persist();
      let userId = JSON.parse(localStorage.getItem("currentUser"))._id;
      // let workorders = JSON.parse(localStorage.getItem("savedWorkorders"));

      console.log(userId);
      // let workorders = JSON.parse(localStorage.getItem("savedWorkorders"));
      // let workorders1 =
      const data = await axios.get(
        process.env.REACT_APP_API_URL + `/user/allUserWorkorders/${userId}`
      );
      console.log(data.data);
      // if (data) {
      // localStorage.setItem("savedWorkorders", JSON.stringify(data.data));
      localStorage.setItem("completedWorkorders", JSON.stringify(data.data));
      console.log(e.target.value);

      localStorage.removeItem("jobs");
      // let allWorkorders = JSON.parse(localStorage.getItem("workorders"));
      // let completedWorkorders = allWorkorders.filter(
      //   m => m.status == "pending"
      // );
      // let workorders = completedWorkorders;
      localStorage.setItem("workorders", JSON.stringify(data.data));
      localStorage.setItem("chosenOpt", JSON.stringify("pending"));
      // window.location.reload();
      this.props.history.push(`/user/workorders/${e.target.value}`);
      // document.location.reload();
      // }
      // window.location = `/user/workorders/${e.target.value}`;
    } else if (e.target.value == "new") {
      localStorage.removeItem("jobs");
      localStorage.removeItem("startBtn");
      localStorage.removeItem("building");
      localStorage.setItem("chosenOpt", JSON.stringify("new"));
      let work = JSON.parse(localStorage.getItem("workorder"));
      work.jobs = {};
      work.buildingNumber = "";
      work.apartmentNumber = "";
      work.adress = "";
      work.squareFeet = "";
      delete work._id;

      localStorage.setItem("workorder", JSON.stringify(work));
      const region = JSON.parse(localStorage.getItem("currentUser")).region;

      this.props.history.push(`/rooms/${region}`);
      document.location.reload();
      // window.location = `/rooms/${region}`;
    } else {
    }
  };

  constructor(props) {
    super(props);

    // const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
    //   m => m.region === this.props.match.params.id
    // );

    // const data = [...this.state.data];

    // const d = buildings.map(
    //   element => (element.value = element.adress + " (" + element.zip + ")")
    // );

    // const showing = false;
    // data.push(d);
    // this.state = { data, showing };
  }

  handleChange(e) {
    const building1 = e.target.value;
    const build = building1.split(":");
    const building = build[0];

    const work = JSON.parse(localStorage.getItem("workorder"));
    work.buildingNumber = building;
    localStorage.setItem("workorder", JSON.stringify(work));
  }

  render() {
    let start = "";
    let klasa = "";
    let building = "";
    let managerName = "";
    let managerEmail = "";
    let managerPhone = "";
    let chosenOpt = "";
    let chosenOptNew = "";
    let chosenOptSaved = "";
    let chosenOptPending = "";
    let saved = false;
    let region = JSON.parse(localStorage.getItem("currentUser")).region;
    if (localStorage.getItem("chosenOpt")) {
      let chosenOpt = JSON.parse(localStorage.getItem("chosenOpt"));
      if (chosenOpt == "new") {
        chosenOptNew = true;
      } else if (chosenOpt == "saved") {
        chosenOptSaved = true;
      } else if (chosenOpt == "pending") {
        chosenOptPending = true;
      } else {
        return;
      }
    }
    if (JSON.parse(localStorage.getItem("chosenOpt")) == "saved") {
      saved = true;
    }
    console.log(this.props.buildingState);
    if (this.props.buildingState) {
      if (JSON.parse(localStorage.getItem("building")) != null) {
        building = JSON.parse(localStorage.getItem("building"));
        managerName = building.managerName;
        managerEmail = building.managerEmail;
        managerPhone = building.managerPhone;
      } else {
      }
    } else {
    }

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userName = currentUser.name;
    let userEmail = currentUser.email;

    if (this.props.adress == "Wrong Building Number") {
      klasa = "build-div btn btn-danger";
    } else {
      klasa = "build-div btn btn-success";
    }

    if (localStorage.getItem("startBtn")) {
      start = true;
    }

    const data = this.state.data;
    const datas = data[0];
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    let dat = new Date(workorder.loginTime).toLocaleString();
    const dateNow =
      dat.substring(0, dat.length - 6) + dat.slice(dat.length - 3);

    return (
      <nav className="nav-box  text-center">
        <div className="row">
          <div className="logoBenLeeds col-12 p-3">
            <img src={logo} alt="Ben Leeds Logo" />
          </div>
          <div class="card card-user col-sm-4 offset-sm-4 ">
            <img
              src={this.state.source}
              class="card-img-top user-img"
              alt="..."
            />
            <div class="card-body user-name">
              <h5 class="card-title">{userName}</h5>
            </div>
            <div class="card-footer user-info">
              <small class="text-center">{region}</small>
            </div>
          </div>
        </div>
        {!start ? (
          <div className="px-3">
            <span className="btn text-bold">Choose your option ⇩</span>
            <select
              className="select dropdown-primary form-control mb-3 "
              name="country"
              onChange={this.handleWorkorders}
            >
              {/* {optionNone ? (
                <option selected value="optionNone">
                  Choose your option
                </option>
              ) : (
                <option value="optionNone">Choose your option</option>
              )} */}
              {chosenOptNew ? (
                <option selected value="new">
                  New Work Order
                </option>
              ) : (
                <option value="new">New Work Order</option>
              )}
              {chosenOptSaved ? (
                <option selected value="saved">
                  Saved Work Orders
                </option>
              ) : (
                <option value="saved">Saved Work Orders</option>
              )}
              {chosenOptPending ? (
                <option selected value="pending">
                  Sent Work Orders
                </option>
              ) : (
                <option value="pending">Sent Work Orders</option>
              )}
              {/* <label class="mdb-main-label">Blue select</label> */}
              {/* <option value="">Select building</option>
                  {this.props.build[0].map(e => {
                    console.log(e);
                    // console.log(e);
                    // console.log(this.state.data);
                    // console.log(e);
                    // console.log(index);

                    return <option value={e}>{e}</option>;
                  })} */}
            </select>
          </div>
        ) : null}
        <div className="row m-1 mb-3">
          {/* <div className="col-sm-4">
            <div class="card text-white bg-secondary mb-3">
              <div class="card-header">Regional Info</div>
              <div class="card-body">
                <h5 class="card-title">{"Name: " + userName}</h5>

                <p class="card-text">{"Email: " + userEmail}</p>
              </div>
            </div>

            {/* <label className="btn btn-secondary ">Workorders</label> */}
          {/* </div> */}

          {/* <div className="col-sm-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="build input-group-text  text-white">
                  Manager Info
                </div>
              </div>
              <textarea name="" id="" cols="30" rows="3">
                {"Name: " + managerName + " " + "Phone: " + managerPhone}
              </textarea>
              {/* <input
                  value={this.props.value2}
                  onChange={this.props.onHandleSquare}
                  className={`build-input ${this.props.classs}`}
                /> */}
          {/* </div> */}

          {/* <label className="btn btn-secondary ">Workorders</label> */}
          {/* </div> */}
          <div className="date col-sm-4 offset-sm-4">
            <div className="input-group ">
              <div className="input-group-prepend">
                <div className="build input-group-text text-white ">
                  Date/Time:
                </div>
              </div>
              <input
                disabled
                type="text"
                className="form-control text-center"
                defaultValue={dateNow}
              />
            </div>
          </div>
        </div>

        <div className="container mainPage">
          {!chosenOptSaved && !chosenOptPending ? (
            <div className="row nav-box">
              <div className="col-sm-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="build input-group-text  text-white">
                      Building#
                    </div>
                  </div>

                  <input
                    disabled={saved ? "true" : null}
                    type="number"
                    min="1"
                    value={this.props.build}
                    className={`build-input ${this.props.classs}`}
                    onChange={this.props.onHandleInput}
                  />

                  <br />
                  {this.props.showing ? (
                    <div className={klasa}>{this.props.adress}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="build input-group-text  text-white">
                      Apartment#
                    </div>
                  </div>
                  <input
                    disabled={saved ? "true" : null}
                    value={this.props.value}
                    onChange={this.props.onHandleAptNum}
                    className={`build-input ${this.props.classs}`}
                  />
                </div>
                {/* <label className="btn btn-secondary ">Workorders</label> */}
              </div>

              <div className="col-sm-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="build input-group-text  text-white">
                      Square Footage:
                    </div>
                  </div>
                  <input
                    hidden={saved ? "true" : null}
                    value={this.props.value2}
                    onChange={this.props.onHandleSquare}
                    className={`build-input ${this.props.classs}`}
                  />
                </div>

                {/* <label className="btn btn-secondary ">Workorders</label> */}
              </div>

              {this.props.buildingState ? (
                <div className="col-12">
                  <div class="card text-dark bg-light mb-3">
                    <div class="card-header">Manager Info</div>
                    <div class="card-body">
                      <h5 class="card-title">{"Name: " + managerName}</h5>
                      <p class="card-text">{"Phone: " + managerPhone}</p>
                      <p class="card-text">{"Email: " + managerEmail}</p>
                    </div>
                  </div>

                  {/* <label className="btn btn-secondary ">Workorders</label> */}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default NavBar;
