import React, { Component } from "react";
import axios from "axios";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import NavBar from "./navBar.jsx";
import { toast, ToastContainer } from "react-toastify";
import Room from "./room.jsx";
import ReactModal from "react-modal";
import { getRooms } from "../services/fakeRoomService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
class Rooms extends Component {
  state = {
    value: [],
    build: [],
    allItems: []
  };
  handleLinks = async id => {
    let isLoadingFullRoom = false;
    localStorage.setItem(
      "isLoadingFullRoom",
      JSON.stringify(isLoadingFullRoom)
    );
    this.setState({ isLoadingFullRoom: false, isLoading: true });

    const allItems = JSON.parse(localStorage.getItem("allItems"));
    let jobs = [...allItems].filter(m => m.checked === true);
    // const jobs = JSON.parse(localStorage.getItem("jobs"));
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

    if (data.statusText === "OK") {
      const work = JSON.parse(localStorage.getItem("workorder"));

      let finalData = {};
      finalData.buildingNumber = work.buildingNumber;
      finalData.apartmentNumber = work.apartmentNumber;
      finalData.userId = work.userId;

      // finalData.getItems = false;

      // work.autosaveTime = new Date();
      // work.jobs = jobs;
      // localStorage.setItem("workorder", JSON.stringify(work));
      // const finalData = JSON.parse(localStorage.getItem("workorder"));
      console.log(finalData);
      const data1 = await axios.post(
        process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
        JSON.stringify(finalData)
      );

      console.log("GET", finalData);
      console.log("GET", data1);

      if (data1.data) {
        let _id = data1.data._id;
        work._id = _id;
        console.log("Radi", _id);
        localStorage.setItem("workorder", JSON.stringify(work));
        // localStorage.setItem("jobs", JSON.stringify(data1.data.workorder.jobs));
      }

      if (data1.statusText === "OK") {
        let allItems = JSON.parse(localStorage.getItem("allItems"));
        let jobsi = [];
        if (data1.data.jobs != undefined) {
          jobsi = data1.data.jobs;
        }

        let checked = jobsi.filter(j => allItems.filter(m => m._id == j._id));

        let checkedArr = jobsi.map(j => j).map(m => m._id);
        let unchecked = allItems.filter(
          d => d._id != checkedArr.find(m => m == d._id)
        );
        allItems = checked.concat(unchecked);
        localStorage.setItem("allItems", JSON.stringify(allItems));
        console.log("get", finalData);
        console.log("get", data1);
        // document.location = "/rooms/" + this.props.id + "/" + this.props.region;
        this.props.history.push(
          "/rooms/" + id + "/" + this.props.match.params.id
        );
      }
    }
    // const jobs = JSON.parse(localStorage.getItem("jobs"));
  };

  async handleAsync() {
    this.setState({ start: true, isLoading: true });
    const work = JSON.parse(localStorage.getItem("workorder"));
    if (work.buildingNumber && work.apartmentNumber) {
      let finalData = {};

      finalData.buildingNumber = work.buildingNumber;
      finalData.apartmentNumber = work.apartmentNumber;
      finalData.userId = work.userId;

      // finalData.getItems = false;

      const data1 = await axios.get(
        process.env.REACT_APP_API_URL + "/user/allItems"
      );
      // const data1 = await axios.get(
      //   process.env.REACT_APP_API_URL + "/user/allItems",
      //   JSON.stringify(finalData)
      // );
      this.setState({ isLoading: false });

      localStorage.setItem("allItems", JSON.stringify(data1.data.items));
      if (data1.statusText === "OK") {
        console.log("radi itemsi");
        const data2 = await axios.post(
          process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
          JSON.stringify(finalData)
        );
        console.log(finalData, "data2FinalData");
        console.log("data2", data2);
        if (data2.statusText === "OK") {
          let allItems = JSON.parse(localStorage.getItem("allItems"));
          let jobsi = [];
          if (data2.data.jobs != undefined) {
            jobsi = data2.data.jobs;
          }

          let checked = jobsi.filter(j => allItems.filter(m => m._id == j._id));

          let checkedArr = jobsi.map(j => j).map(m => m._id);
          let unchecked = allItems.filter(
            d => d._id != checkedArr.find(m => m == d._id)
          );
          allItems = checked.concat(unchecked);
          localStorage.setItem("allItems", JSON.stringify(allItems));
          console.log("finalni", finalData, data2);

          console.log("radi get id");
          if (data2.data._id) {
            let _id = data2.data._id;
            work._id = _id;
            console.log("workorder u getu", work);
            localStorage.setItem("workorder", JSON.stringify(work));
          }
        }
        // localStorage.setItem(
        //   "allItems",
        //   JSON.stringify(data2.data.items)
        // );
        // localStorage.setItem(
        //   "jobs",
        //   JSON.stringify(data1.data.workorder.jobs)
        // );
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
    ReactModal.setAppElement("body");
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
          // localStorage.setItem("jobs", JSON.stringify(allItems));
        }

        localStorage.removeItem("chosenOpt");
        work.adress = adress;
        work.jobs = this.props.location.state.jobs;
        value = this.props.location.state.apartmentNumber;
        work.squareFeet = this.props.location.state.squareFeet;
        work.level = this.props.location.state.level;
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

  // handleOpenModal(tittle) {
  //   let button = this.state.button;
  //   let showModal = this.state.showModal;
  //   this.setState({ showModal: true, button: tittle });
  // }

  // handleCloseModal() {
  //   let showModal = this.state.showModal;

  //   this.setState({ showModal: false });
  // }

  async handleHomeButton() {
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    let jobs = [...allItems].filter(m => m.checked === true);
    // const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.autosaveTime = new Date();
    if (jobs != null) {
      work.jobs = jobs;
    }
    console.log(work);
    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));

    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newTempWorkorder",
      JSON.stringify(finalData)
    );

    console.log("newWorkorder", finalData);
    console.log("newW", data);
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
      work.level = "";

      delete work._id;

      localStorage.setItem("workorder", JSON.stringify(work));
      const region = JSON.parse(localStorage.getItem("currentUser")).region;
      // this.setState({ buildingState: false });
      this.props.history.push(`/rooms/${region}`);
      document.location.reload();
    }
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
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    const allItemsi = [...allItems];
    let jobs = allItemsi.filter(m => m.checked === true);
    // localStorage.setItem("jobs", JSON.stringify(jobs));
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
    if (data.statusText === "OK") {
      console.log("newWorkorder", finalData);
      console.log("newW", data);
      this.props.history.push(
        "/rooms/" + this.props.match.params.id + "/work-order"
      );
      // const work = JSON.parse(localStorage.getItem("workorder"));
      const date = new Date();
      work.completedTime = date;
      localStorage.setItem("workorder", JSON.stringify(work));
    }
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
  handleClose = () => {
    const setShow = this.state.setShow;
    this.setState({ setShow: false });
  };
  handleOptionOtherComment = e => {
    const value = e.target.value;
    const name = e.currentTarget.name;
    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));

    work[name] = value;
    localStorage.setItem("workorder", JSON.stringify(work));
    console.log("value", value);
    this.setState({ optionOther: value });
  };
  handleShow = tittle => {
    const button = this.state.button;
    const setShow = this.state.setShow;
    const showModalInputOther = false;
    this.setState({ setShow: true, button: tittle, showModalInputOther });
  };
  handleMakeReady() {
    this.setState({ makeReady: true });
  }
  handleOptionOther = e => {
    const value = e.target.value;
    const optionOther = this.state.optionOther;
    const name = e.currentTarget.name;
    const showModalInputOther = this.state.showModalInputOther;
    // const work = JSON.parse(localStorage.getItem("workorder"));
    // console.log("radi gde treba", optionOther);
    // work[name] = optionOther;
    // localStorage.setItem("workorder", JSON.stringify(work));
    this.setState({ showModalInputOther: true });
  };

  handleOptionYes = e => {
    // console.log("eee", e.target.value, e.currentTarget.name);
    const value = e.target.value;
    const name = e.currentTarget.name;
    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));
    work[name] = value;
    localStorage.setItem("workorder", JSON.stringify(work));
    this.setState({ showModalInputOther: false });
  };
  handleOptionNo = e => {
    const value = e.target.value;
    const name = e.currentTarget.name;
    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));
    work[name] = value;
    localStorage.setItem("workorder", JSON.stringify(work));
    this.setState({ showModalInputOther: false });
  };
  constructor(props) {
    super(props);
    // const [show, seSt
    const setShow = false;
    const showModalInputOther = false;
    // toast.error("Please enter Building and Apartment number");
    // const build = [...this.state.build];
    let start = "";
    let buildingState = "";
    let build = "";
    const adress = "";
    let showing = false;
    let value = "";
    let value2 = "";
    let showModal = false;
    let button = "";
    // let value3 = "";
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
      button,
      rooms: rooms,
      value,
      showing: false,
      build,
      start,
      value2,
      // value3,
      buildingState,
      isLoading,
      isLoadingFullRoom,
      showModal,
      setShow,
      showModalInputOther
    };
  }

  render() {
    console.log("render", this.state.optionOther);
    // const customStyles = {
    //   content: {
    //     // textAlign: "center",
    //     top: "50%",
    //     left: "50%",
    //     right: "auto",
    //     bottom: "auto",
    //     marginRight: "-50%",
    //     transform: "translate(-50%, -50%)"
    //   }
    // };
    // const customStyles = {
    //   content: {
    //     position: "absolute",
    //     top: "100px",
    //     left: "100px",
    //     right: "100px",
    //     bottom: "100px",
    //     border: "1px solid rgb(204, 204, 204)",
    //     background: "rgb(255, 255, 255)",
    //     overflow: "auto",
    //     borderRadius: "4px",
    //     outline: "none",
    //     padding: "20px"
    //   }
    // };
    // let isLoading = this.state.isLoading;
    let adress = [];
    let button = this.state.button;
    let value2 = this.state.value2;
    // let value3 = this.state.value3;
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
    const showModalInputOther = this.state.showModalInputOther;
    const makeReady = this.state.makeReady;
    //  const [show, setShow] = useState(false);

    //     const handleClose = () => setShow(false);
    //     const handleShow = () => setShow(true);
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
          // value3={value3}
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
          <div>
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3"
            >
              &#x2716; Logout
            </button>
          </div>
        </div>
        {this.state.start && value ? (
          <div className="row m-2">
            <div className="col-3">
              <button
                onClick={() => this.handleMakeReady()}
                className="btn btn-outline-primary btn-lg m-1"
              >
                Make Ready
              </button>
            </div>
            <div className="col-9">
              <button
                className=" btn  btn-primary  m-1"
                onClick={() => this.handleShow("Floor")}
              >
                Floor
              </button>
              <button
                className=" btn  btn-primary  m-1"
                onClick={() => this.handleShow("Paint")}
              >
                Paint
              </button>
              <button
                className=" btn btn-primary   m-1"
                onClick={() => this.handleShow("Appliances")}
              >
                Appliances
              </button>
              <button
                className="btn btn-primary   m-1"
                onClick={() => this.handleShow("Windows")}
              >
                Windows
              </button>
              <button
                className=" btn btn-primary   m-1"
                onClick={() => this.handleShow("Blinds")}
              >
                Blinds
              </button>
              <button
                className=" btn btn-primary    m-1"
                onClick={() => this.handleShow("Cleaning")}
              >
                Cleaning
              </button>
              <button
                className="btn btn-primary   m-1"
                onClick={() => this.handleShow("Re-glazed")}
              >
                Re-glazed
              </button>
              <button
                className="btn btn-primary   m-1"
                onClick={() => this.handleShow("Pest Cont")}
              >
                Pest Cont
              </button>

              {/* <Button variant="primary" onClick={this.handleShow}>
              Launch demo modal
            </Button> */}

              <Modal show={this.state.setShow} onHide={this.handleClose}>
                <Modal.Header id="modal-styling-title" closeButton>
                  <Modal.Title> {button}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-11 m-3">
                      {/* <h3 className="text-center">{button}</h3> */}
                      <br />
                      <input
                        className="m-3"
                        type="radio"
                        name={button}
                        value="yes"
                        onClick={e => this.handleOptionYes(e)}
                      />
                      Yes
                      <br />
                      <input
                        className="m-3"
                        type="radio"
                        name={button}
                        value="no"
                        onClick={e => this.handleOptionNo(e)}
                      />
                      No
                      <br />
                      <input
                        className="m-3"
                        type="radio"
                        name={button}
                        value="other"
                        onClick={e => this.handleOptionOther(e)}
                      />
                      Other
                      <br />
                      {showModalInputOther ? (
                        <textarea
                          onChange={e => this.handleOptionOtherComment(e)}
                          placeholder="Comment"
                          name={button}
                          id=""
                          cols="50"
                          rows="5"
                        />
                      ) : null}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button> */}
                  <Button variant="primary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* <ReactModal
              style={customStyles}
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
            >
              <div className="row">
                <div className="col-11 m-3">
                  <h3 className="text-center">{button}</h3>
                  <br />
                  <input
                    className="m-3"
                    type="radio"
                    name="gender"
                    value="male"
                  />
                  Yes
                  <br />
                  <input
                    className="m-3"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  No
                  <br />
                  <input
                    className="m-3"
                    type="radio"
                    name="gender"
                    value="other"
                  />
                  Other
                  <br />
                </div>
                <div className="col-12 text-right ">
                  <button onClick={() => this.handleCloseModal()}>
                    Close Modal
                  </button>
                </div>
              </div>
            </ReactModal> */}
            </div>
          </div>
        ) : null}
        {/* <div className="row"> */}
        {/* <p>Please select your gender:</p>
          <input type="radio" name="gender" value="male" /> Male
          <br />
          <input type="radio" name="gender" value="female" /> Female
          <br />
          <input type="radio" name="gender" value="other" /> Other
          <br />
        </div> */}
        {this.state.start && value && makeReady ? (
          <div className="row">
            {this.state.rooms.map(room => (
              <div className="col-4 p-3">
                <div className="card mb-3 text-center">
                  <Link
                    className="links"
                    onClick={() => this.handleLinks(room.id)}
                    // to={"/rooms/" + this.props.id + "/" + this.props.region}
                  >
                    <img
                      className="card-img-top img-fluid"
                      src={room.image}
                      alt="Card image cap"
                    />
                    <div className="card-footer text-center">{room.name}</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Rooms;
