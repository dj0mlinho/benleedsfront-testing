import React, { Component } from "react";
import axios from "axios";
import "../css/navbar.css";

import NavBar from "./navBar.jsx";
import { toast, ToastContainer } from "react-toastify";
import Room from "./room.jsx";
import { getRooms } from "../services/fakeRoomService";

class Rooms extends Component {
  state = {
    value: [],
    build: [],
    allItems: []
  };

  async handleAsync() {
    this.setState({ start: true, isLoading: true });
    const work = JSON.parse(localStorage.getItem("workorder"));
    if (work.buildingNumber && work.apartmentNumber) {
      let finalData = {};

      finalData.buildingNumber = work.buildingNumber;
      finalData.apartmentNumber = work.apartmentNumber;
      finalData.userId = work.userId;

      const data1 = await axios.post(
        process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
        JSON.stringify(finalData)
      );
      this.setState({ isLoading: false });

      localStorage.setItem("allItems", JSON.stringify(data1.data.items));
      if (data1.data.workorder) {
        let _id = data1.data.workorder._id;
        work._id = _id;
        localStorage.setItem("workorder", JSON.stringify(work));

        localStorage.setItem("allItems", JSON.stringify(data1.data.items));
        localStorage.setItem("jobs", JSON.stringify(data1.data.workorder.jobs));
      }
      let start = true;

      localStorage.setItem("startBtn", JSON.stringify(start));
      this.setState({ start: true, isLoading: false });
    } else {
      alert("Please enter Building and Apartment Number!");
      this.setState({ start: false, isLoading: false });
    }
  }

  componentDidMount() {
    const adress = "";
    let showing = false;
    let value = "";
    let value2 = "";
    let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );

    console.log(this.props);

    if (this.state.start || this.props.location.state) {
      let allItems = JSON.parse(localStorage.getItem("allItems"));
      if (this.props.location.state) {
        const buildNumber = this.props.location.state.buildingNumber;

        let building = buildings.find(m => m.number == buildNumber);
        // }urac

        const adress = building.adress + " (" + building.zip + ")";
        // console.log(buildings);
        const work = JSON.parse(localStorage.getItem("workorder"));
        //  allItems = JSON.parse(localStorage.getItem("allItems"));
        // // work.workorder.id = this.props.location.state.id;
        // work.workorder.buildingNumber = buildNumber;
        // work.workorder.apartmentNumber = this.props.location.state.apartmentNumber;
        if (this.state.start) {
          let checkedJobs = this.props.location.state.jobs;
          let k = checkedJobs.filter(j => allItems.filter(m => m._id == j._id));
          // console.log(kurac);
          let j = checkedJobs.map(j => j).map(m => m._id);
          let p = allItems.filter(d => d._id != j.find(m => m == d._id));

          allItems = k.concat(p);

          localStorage.setItem("allItems", JSON.stringify(allItems));
          localStorage.setItem("jobs", JSON.stringify(allItems));
        }

        localStorage.removeItem("chosenOpt");
        work.adress = adress;
        work.jobs = this.props.location.state.jobs;
        value = this.props.location.state.apartmentNumber;
        work.apartmentNumber = value;
        work.buildingNumber = buildNumber;
        localStorage.setItem("workorder", JSON.stringify(work));
        showing = true;
        this.state = { showing: showing, adress };
      }
    }
  }
  // async handleSavedWorkorders() {
  //   localStorage.removeItem("chosenOpt");
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   let finalData = {};
  //   finalData.buildingNumber = work.buildingNumber;
  //   finalData.apartmentNumber = work.apartmentNumber;
  //   finalData.userId = work.userId;

  //   // work.autosaveTime = new Date();
  //   // work.jobs = jobs;
  //   // localStorage.setItem("workorder", JSON.stringify(work));
  //   // const finalData = JSON.parse(localStorage.getItem("workorder"));
  //   console.log(finalData);
  //   const data1 = await axios.post(
  //     process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
  //     JSON.stringify(finalData)
  //   );
  //   console.log(data1);
  //   localStorage.setItem("allItems", JSON.stringify(data1.data.items));
  //   this.props.history.push(`/user/workorders/saved`);
  //   document.location.reload();
  // }
  async handleHomeButton() {
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.autosaveTime = new Date();
    if (jobs != null) {
      work.jobs = jobs;
    }

    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));

    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newTempWorkorder",
      JSON.stringify(finalData)
    );

    console.log(data);
    if (data.statusText === "OK") {
      let work = JSON.parse(localStorage.getItem("workorder"));

      localStorage.removeItem("jobs");
      localStorage.removeItem("startBtn");
      localStorage.removeItem("building");
      localStorage.removeItem("chosenOpt");
      work.jobs = {};
      work.buildingNumber = "";
      work.apartmentNumber = "";
      work.adress = "";
      work.squareFeet = "";
      delete work._id;

      localStorage.setItem("workorder", JSON.stringify(work));
    }
    const region = JSON.parse(localStorage.getItem("currentUser")).region;
    // this.setState({ buildingState: false });
    this.props.history.push(`/rooms/${region}`);
    document.location.reload();
  }
  // async handleHomeButton() {
  //   // const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
  //   // localStorage.removeItem("jobs");
  //   // localStorage.removeItem("startBtn");
  //   // localStorage.removeItem("building");
  //   // localStorage.removeItem("chosenOpt");
  //   // localStorage.removeItem("isLoadingFullRoom");
  //   // // localStorage.removeItem("allItems");
  //   // let work = JSON.parse(localStorage.getItem("workorder"));
  //   // work.jobs = {};
  //   // work.buildingNumber = "";
  //   // work.apartmentNumber = "";
  //   // work.adress = "";
  //   // work.squareFeet = "";
  //   // delete work._id;
  //   // localStorage.setItem("workorder", JSON.stringify(work));
  //   // const region = JSON.parse(localStorage.getItem("currentUser")).region;
  //   // this.setState({ buildingState: false });
  //   // this.props.history.push(`/rooms/${region}`);
  //   // document.location.reload();
  // }
  handleBackButton = url => {
    // this.props.history.push("/rooms/" + this.props.match.params.id);
    // return console.log(this.props.match.url);
  };
  handleFinishedButton = async () => {
    let start = true;
    localStorage.setItem("startBtn", JSON.stringify(start));
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.autosaveTime = new Date();
    if (jobs != null) {
      work.jobs = jobs;
    }

    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));

    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newTempWorkorder",
      JSON.stringify(finalData)
    );

    this.props.history.push(
      "/rooms/" + this.props.match.params.id + "/work-order"
    );
    // const work = JSON.parse(localStorage.getItem("workorder"));
    const date = new Date();
    work.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };
  // handleWorkOrder = async () => {
  //   window.alert("In development...");
  // };

  handleInput = e => {
    // console.log(e.target.value);
    const { showing } = this.state;
    // const{ build}=this.state;
    let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );

    let building = buildings.find(m => m.number == e.target.value);

    localStorage.setItem("building", JSON.stringify(building));

    const work = JSON.parse(localStorage.getItem("workorder"));

    if (building === undefined) {
      const adress = "Wrong Building Number";

      const work = JSON.parse(localStorage.getItem("workorder"));
      work.buildingNumber = "";
      work.adress = adress;

      localStorage.setItem("workorder", JSON.stringify(work));
      let buildingNum = e.target.value;
      let buildingState = false;
      this.setState({ showing: true, adress, buildingNum, buildingState });
    } else {
      localStorage.setItem("building", JSON.stringify(building));

      const adress = building.adress + " (" + building.zip + ")";

      const work = JSON.parse(localStorage.getItem("workorder"));
      work.buildingNumber = e.target.value;
      work.adress = adress;
      localStorage.setItem("workorder", JSON.stringify(work));
      let buildingNum = e.target.value;
      let buildingState = true;
      this.setState({ showing: true, adress, buildingNum, buildingState });
    }
    localStorage.removeItem("jobs");
  };

  handleAptNum = e => {
    let value = "";
    let work = JSON.parse(localStorage.getItem("workorder"));
    // value = workorder.apartmentNumber;
    work.apartmentNumber = e.target.value;
    // const workOrder = JSON.parse(localStorage.getItem("workorder"));
    // workOrder.workorder.apartmentNumber = e.target.value;
    localStorage.setItem("workorder", JSON.stringify(work));

    this.setState({
      value: e.target.value
    });
  };
  handleSquare = e => {
    let value2 = "";
    let work = JSON.parse(localStorage.getItem("workorder"));
    // value = workorder.apartmentNumber;
    work.squareFeet = e.target.value;
    // const workOrder = JSON.parse(localStorage.getItem("workorder"));
    // workOrder.workorder.apartmentNumber = e.target.value;
    localStorage.setItem("workorder", JSON.stringify(work));

    this.setState({
      value2: e.target.value
    });
  };

  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.clear();
      document.location = "/";
    }
  }
  constructor(props) {
    super(props);

    // toast.error("Please enter Building and Apartment number");
    // const build = [...this.state.build];
    let start = "";
    let buildingState = "";
    let build = "";
    const adress = "";
    let showing = false;
    let value = "";
    let value2 = "";
    let value3 = "";
    let workorder = JSON.parse(localStorage.getItem("workorder"));
    let isLoading = false;
    let isLoadingFullRoom = true;
    // let jobs = JSON.parse(localStorage.getItem("jobs"));

    // if (localStorage.getItem("isLoadingFullRoom") == false) {
    //   isLoadingFullRoom = false;
    // }

    if (localStorage.getItem("startBtn")) {
      start = true;
    }
    if (localStorage.getItem("building")) {
      buildingState = true;
    }

    // let allItems;
    let rooms = getRooms();
    this.state = {
      rooms: rooms,
      value,
      showing: false,
      build,
      start,
      value2,
      value3,
      buildingState,
      isLoading,
      isLoadingFullRoom
    };
  }

  render() {
    console.log(this.state.source);
    let adress = [];
    let value2 = this.state.value2;
    let value3 = this.state.value3;
    // console.log(typeof this.state.buildingNum);
    let showing = this.state.showing;
    let saved = false;
    let isLoading = this.state.isLoading;
    let isLoadingFullRoom = this.state.isLoadingFullRoom;

    if (JSON.parse(localStorage.getItem("chosenOpt")) == "saved") {
      saved = true;
    }
    // );
    let workorder = JSON.parse(localStorage.getItem("workorder"));
    let value = "";
    value = this.state.value;
    value = workorder.apartmentNumber;

    let building = "";

    if (this.state.buildingNum && workorder.adress != undefined) {
      // console.log("radi");
      value = workorder.apartmentNumber;
      adress = workorder.adress;

      showing = true;
    } else {
      showing = false;
    }

    if (workorder.adress != "" && workorder.buildingNumber != "") {
      value = workorder.apartmentNumber;
      value2 = workorder.squareFeet;
      adress = workorder.adress;
      showing = true;
    }
    if (workorder.buildingNumber == "") {
      value = "";
      workorder.apartmentNumber = "";
      localStorage.setItem("workorder", JSON.stringify(workorder));
    }

    let rooms = this.state.rooms.map(room => {
      return (
        <Room
          key={room.id}
          region={this.props.match.params.id}
          id={room.id}
          image={room.image}
          name={room.name}
        />
      );
    });

    return (
      <div className="container main-page">
        {/* <img className="testImg" src={this.state.source} alt="" /> */}
        <ToastContainer />

        <NavBar
          {...this.props}
          showing={showing}
          value={value}
          // build={build}
          buildingState={this.state.buildingState}
          value2={value2}
          value3={value3}
          onHandleInput={this.handleInput}
          adress={adress}
          classs=""
          onHandleChange={this.handleChange1}
          onHandleSquare={this.handleSquare}
          onHandleLevels={this.handleLevels}
          onHandleAptNum={this.handleAptNum}
          onChangeBuildings={() => this.handleChangeBuilding()}
        />
        <div className="buttons">
          {this.state.start && !this.state.isLoading ? (
            <button
              onClick={() => this.handleBackButton()}
              className="btn btn-warning m-3"
            >
              ⏎ Back
            </button>
          ) : null}
          <div className="float-left">
            <button
              onClick={() => this.handleHomeButton()}
              className="btn btn-info m-3"
            >
              Home
            </button>
          </div>
          {this.state.start && !this.state.isLoading ? (
            <button
              onClick={() => this.handleFinishedButton()}
              className="btn btn-primary m-3"
            >
              Forward
            </button>
          ) : null}
          {!this.state.start ? (
            <div className="col-6">
              <button
                onClick={() => this.handleAsync()}
                className="btn btn-success m-3"
              >
                {saved ? "Continue Saved Workorder" : "Start"}
              </button>
            </div>
          ) : null}

          {isLoading || !isLoadingFullRoom ? (
            <div className="col-6 m-3">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
          <div className="">
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3"
            >
              &#x2716; Logout
            </button>
          </div>
        </div>
        {this.state.start && value ? <div className="row">{rooms}</div> : null}
      </div>
    );
  }
}

export default Rooms;
