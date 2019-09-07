import React, { Component } from "react";
import axios from "axios";
import "../css/navbar.css";
import logo from "../img/ben-leeds-logo.png";

class NavBar extends Component {
  state = {
    data: [],
    value: "",
    showing: true
  };

  async componentDidMount() {
    let source = JSON.parse(localStorage.getItem("currentUser")).imgPath;
    this.setState({ source });
  }
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      this.props.history.push(`/`);
      // window.location = `/`;
    }
  }
  handleWorkorders = async e => {
    console.log(e.target);
    if (e.target.value == "saved") {
      e.preventDefault();
      e.persist();
      let userId = JSON.parse(localStorage.getItem("currentUser"))._id;

      const data = await axios.get(
        process.env.REACT_APP_API_URL + `/user/getAllTempWorkorders/${userId}`
      );

      localStorage.setItem("savedWorkorders", JSON.stringify(data.data));
      localStorage.setItem("workorders", JSON.stringify(data.data));
      localStorage.setItem("chosenOpt", JSON.stringify("saved"));

      this.props.history.push(`/user/workorders/${e.target.value}`);

      document.location.reload();
    } else if (e.target.value == "pending") {
      // let userId = JSON.parse(localStorage.getItem("savedWorkorders")).userId;
      e.preventDefault();
      e.persist();
      let userId = JSON.parse(localStorage.getItem("currentUser"))._id;

      const data = await axios.get(
        process.env.REACT_APP_API_URL + `/user/allUserWorkorders/${userId}`
      );

      localStorage.setItem("completedWorkorders", JSON.stringify(data.data));

      localStorage.removeItem("jobs");

      localStorage.setItem("workorders", JSON.stringify(data.data));
      localStorage.setItem("chosenOpt", JSON.stringify("pending"));

      this.props.history.push(`/user/workorders/${e.target.value}`);
    } else if (e.target.value == "new") {
      localStorage.removeItem("jobs");
      localStorage.removeItem("makeReady");
      localStorage.removeItem("checkedQuestions");
      localStorage.removeItem("startBtn");
      localStorage.removeItem("building");
      localStorage.setItem("chosenOpt", JSON.stringify("new"));
      let work = JSON.parse(localStorage.getItem("workorder"));
      work.jobs = {};
      work.buildingNumber = "";
      work.apartmentNumber = "";
      work.adress = "";
      work.squareFeet = "";
      work.questions = "";

      work.level = "";
      delete work._id;
      delete work.checkedQuestions;

      localStorage.setItem("workorder", JSON.stringify(work));
      const region = JSON.parse(localStorage.getItem("currentUser")).region;

      this.props.history.push(`/rooms/${region}`);
      // document.location.reload();
      // window.location = `/rooms/${region}`;
    } else {
    }
  };

  constructor(props) {
    super(props);
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
    let userRegion = currentUser.region;

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
        </div>
        {!start ? (
          <div className="px-3">
            <div className="row m-1">
              <div className="date col-sm-4 offset-sm-4">
                {!chosenOptSaved &&
                !chosenOptPending &&
                !start &&
                !this.props.location.state ? (
                  <div className="card card-user col-sm-8  offset-sm-2">
                    <img
                      src={this.state.source}
                      className="card-img-top user-img"
                      alt="..."
                    />
                    <div className="card-body user-name">
                      <h5 className="card-title">{userName}</h5>
                    </div>
                    <div className="card-footer user-info">
                      <small className="text-center">{region}</small>
                    </div>
                  </div>
                ) : null}
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
              {/* <span className="btn text-bold">Choose your option:</span> */}
            </div>

            {/* <div
              className="select dropdown-primary form-control mb-3 "
              name="country"
            > */}
            {/* {optionNone ? (
                <option selected value="optionNone">
                  Choose your option
                </option>
              ) : (
                <option value="optionNone">Choose your option</option>
              )} */}
            <div className="col-12">
              <div>
                {!chosenOptNew ? (
                  <div>
                    <div className="col-12">
                      <button
                        value="new"
                        className="btn btn-secondary btn-lg m-3"
                        onClick={this.handleWorkorders}
                      >
                        New Work Order
                      </button>
                    </div>
                    <button className="btn btn-secondary btn-lg m-3" disabled>
                      To Do List
                    </button>
                    <button
                      value="saved"
                      className="btn btn-secondary btn-lg m-3"
                      onClick={this.handleWorkorders}
                    >
                      Saved Work Orders
                    </button>

                    <button
                      value="pending"
                      className="btn btn-secondary btn-lg m-3"
                      onClick={this.handleWorkorders}
                    >
                      Sent Work Orders
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="container mainPage">
          {!chosenOptSaved &&
          !chosenOptPending &&
          chosenOptNew &&
          !start &&
          !this.props.location.state ? (
            <div className="row nav-box">
              <div className="col-sm-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="build input-group-text  text-white">
                      Building#
                    </div>
                  </div>

                  <input
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
                    value={this.props.value}
                    onChange={this.props.onHandleAptNum}
                    className={`build-input ${this.props.classs}`}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="build input-group-text  text-white">
                      Square Footage
                    </div>
                  </div>
                  <input
                    value={this.props.value2}
                    onChange={this.props.onHandleSquare}
                    className={`build-input ${this.props.classs}`}
                  />
                </div>
              </div>

              {this.props.buildingState ? (
                <div className="col-12">
                  <div className="card text-dark bg-light mb-3">
                    {/* <div className="card-header">Manager Info</div> */}
                    <div className="row m-2">
                      <div className="col-2">Menager:</div>
                      <div className="col-3">{"Name: " + managerName}</div>
                      <div className="col-3">{"Phone: " + managerPhone}</div>
                      <div className="col-4">{"Email: " + managerEmail}</div>
                    </div>
                    <div className="row m-2">
                      <div className="col-2">Regional:</div>
                      <div className="col-3">{"Name: " + userName}</div>
                      <div className="col-3">{"Region: " + userRegion}</div>
                      <div className="col-4">{"Phone: " + userEmail}</div>
                    </div>
                  </div>
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
