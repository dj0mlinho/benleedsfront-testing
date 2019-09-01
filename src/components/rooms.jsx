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

    console.log(work);
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
        let questions = this.props.location.state.questions;

        if (!JSON.parse(localStorage.getItem("checkedQuestions"))) {
          let checkedQuestions = this.props.location.state.checkedQuestions;
          localStorage.setItem(
            "checkedQuestions",
            JSON.stringify(checkedQuestions)
          );
          work.questions = questions;
        }

        // work.checkedQuestions = checkedQuestions;
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
    work.checkedQuestions = JSON.parse(
      localStorage.getItem("checkedQuestions")
    );

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
      work.checkedQuestions = "";

      localStorage.removeItem("checkedQuestions");
      localStorage.removeItem("makeReady");
      delete work._id;
      delete work.questions;

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
    this.setState({
      active: "",
      setShow: false,
      appliancesName: [],
      appliancesName1: []
    });
  };

  handleShow = tittle => {
    const button = this.state.button;
    const setShow = this.state.setShow;
    const showModalInputOther = false;
    this.setState({ setShow: true, button: tittle, showModalInputOther });
  };
  async handleMakeReady() {
    let makeReady = true;
    localStorage.setItem("makeReady", JSON.stringify(makeReady));
    this.setState({ makeReady: true });
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    let jobs = [...allItems].filter(m => m.checked === true);
    // const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));

    work.autosaveTime = new Date();
    if (jobs != null) {
      work.jobs = jobs;
    }
    work.checkedQuestions = JSON.parse(
      localStorage.getItem("checkedQuestions")
    );

    console.log(work);
    console.log(work);
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
      }
    }
  }
  handleOptionOther = e => {
    const value = e.target.value;
    const optionOther = this.state.optionOther;
    const name = e.currentTarget.name.toLowerCase();
    const showModalInputOther = this.state.showModalInputOther;
    // const checked = JSON.parse(localStorage.getItem("checkedQuestions"));
    const work = JSON.parse(localStorage.getItem("workorder"));

    work.questions = {};
    localStorage.setItem("workorder", JSON.stringify(work));
    const checked1 = JSON.parse(localStorage.getItem("checkedQuestions"));
    // const work = JSON.parse(localStorage.getItem("workorder"));

    let checked = work.questions;
    let novo = checked[name];
    let checked2 = { other: [novo] };
    let checked3 = { other: true };
    let checkedQuestions = {
      ...checked1,
      [name]: checked2,
      [name + "1"]: checked3
    };

    localStorage.setItem("checkedQuestions", JSON.stringify(checkedQuestions));
    // if (checkedQuestions) {
    //   // console.log("radi gde treba", optionOther);
    //   // work[name] = optionOther;

    // [name][value] = true;
    // localStorage.setItem(
    //   "checkedQuestions",
    //   JSON.stringify(checkedQuestions)
    // );

    this.setState({ showModalInputOther: true, checkedQuestions });
  };
  handleOptionOtherComment = e => {
    const value = e.target.value;
    const name = e.currentTarget.name;
    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));

    work.questions = { ...work.questions, [name]: value };
    localStorage.setItem("workorder", JSON.stringify(work));
    console.log("value", value);
    const checked1 = JSON.parse(localStorage.getItem("checkedQuestions"));

    let checked = work.questions;
    let novo = checked[name];
    let checked2 = { other: [novo] };
    let checked3 = { other: true };
    let checkedQuestions = {
      ...checked1,
      [name]: checked2,
      [name + "1"]: checked3
    };

    localStorage.setItem("checkedQuestions", JSON.stringify(checkedQuestions));

    //
    // let checked = work.questions;
    // let novo = checked[name];
    // let checked1 = { other: [novo] };

    // localStorage.setItem(name, JSON.stringify(checked1));
    this.setState({ optionOther: value });
  };
  handleOptionYes = e => {
    // console.log("eee", e.target.value, e.currentTarget.name);
    const value = e.target.value;
    const name = e.currentTarget.name.toLowerCase();
    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.questions = { ...work.questions, [name]: value };

    localStorage.setItem("workorder", JSON.stringify(work));
    const checked1 = JSON.parse(localStorage.getItem("checkedQuestions"));

    let checked = work.questions;
    let novo = checked[name];
    let checked2 = { [novo]: true };

    let checkedQuestions = { ...checked1, [name]: checked2 };
    checkedQuestions[name + "1"] = "";
    localStorage.setItem("checkedQuestions", JSON.stringify(checkedQuestions));

    this.setState({ showModalInputOther: false, checkedQuestions });
  };
  handleOptionNo = e => {
    const value = e.target.value;
    const name = e.currentTarget.name.toLowerCase();

    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.questions = { ...work.questions, [name]: value };
    localStorage.setItem("workorder", JSON.stringify(work));
    const checked1 = JSON.parse(localStorage.getItem("checkedQuestions"));

    let checked = work.questions;
    let novo = checked[name];
    let checked2 = { [novo]: true };
    let checkedQuestions = { ...checked1, [name]: checked2 };
    checkedQuestions[name + "1"] = "";
    localStorage.setItem("checkedQuestions", JSON.stringify(checkedQuestions));

    this.setState({ showModalInputOther: false, checkedQuestions });
  };
  handleAppliancesOptions(e) {
    // let checked = this.state.checked;
    // checked[e.currentTarget.name] = e.target.checked;
    // let microwave = this.state.microwave;
    // microwave[0].checked = true;
    // this.setState({
    //   checked
    //   // appliancesName: false,
    //   // stove: false,
    //   // ac: false
    // });

    const value = e.target.value;
    let name = e.target.attributes.getNamedItem("name").value;
    // console.log(e.currentTarget.data - name);

    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));
    // if (work.questions.appliances[name]) {
    //   work.questions.appliances[name].push(value);
    // } else {
    let name1 = name;

    work.questions.appliances = {
      ...work.questions.appliances,
      [name]: [value]
      //   };
      //   // console.log(work.questions.appliances[name].push(value));
    };
    // work.questions.appliances[name].push(value);
    localStorage.setItem("workorder", JSON.stringify(work));
    const checked1 = JSON.parse(localStorage.getItem("checkedQuestions"));
    if (checked1) {
      let checked = work.questions.appliances;
      let novo = checked[name];
      let checked2 = { [novo]: true };
      let checkedQuestions = { ...checked1, [name]: checked2 };

      localStorage.setItem(
        "checkedQuestions",
        JSON.stringify(checkedQuestions)
      );
      this.setState({ checkedQuestions });
    } else {
      // const checked = e.target.checked;

      let checked = work.questions.appliances;
      let novo = checked[name];
      let checked2 = { [novo]: true };
      let checkedQuestions = {};
      checkedQuestions[name] = checked2;

      localStorage.setItem(
        "checkedQuestions",
        JSON.stringify(checkedQuestions)
      );
      this.setState({ checkedQuestions });
    }
    // }
  }

  handleAppliances(e, name) {
    // const value = e.target.value;
    // const idName = e.currentTarget.idName;
    // const showModalInputOther = this.state.showModalInputOther;

    const work = JSON.parse(localStorage.getItem("workorder"));
    const checked = JSON.parse(localStorage.getItem("checkedQuestions"));
    console.log("nameeee", name);
    if (!work.questions.appliances) {
      const appliances = {};
      work.questions = { ...work.questions, appliances };
    } else {
      work.questions.appliances = { ...work.questions.appliances };
    }
    localStorage.setItem("workorder", JSON.stringify(work));
    if (!checked) {
      let checkedQuestions = {};
      localStorage.setItem(
        "checkedQuestions",
        JSON.stringify(checkedQuestions)
      );
    }
    this.setState({
      appliancesName: false
    });
    if (name == "Stove" || name == "AC") {
      const stove = this.state.stove;
      const stove1 = this.state.stove1;
      const stove2 = this.state.stove2;
      console.log("stove eee", name, stove);
      // this.setState({ [name.toLowerCase()]: true });
      console.log("uslo u stove");
      this.setState({
        active: name,
        stove,
        stove1,
        stove2,
        appliancesName: name.toLowerCase()
      });
    } else if (name.toLowerCase() == "microwave") {
      console.log("microwave", name);
      this.setState({
        active: name,
        appliancesName: this.state.microwave,
        appliancesName1: false
      });
      console.log("uslo u sove");
    } else if (name.toLowerCase() == "dishwasher") {
      console.log("dishwasher", name);
      this.setState({
        active: name,
        appliancesName: this.state.dishwasher,
        appliancesName1: this.state.dishwasher1
      });
    } else {
      console.log("refrige", name);
      this.setState({
        active: name,
        appliancesName: this.state.refrigeRator,
        appliancesName1: this.state.refrigeRator1
      });
    }
  }

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
    let buttons = [
      "Floor",
      "Paint",
      "Appliances",
      "Windows",
      "Blinds",
      "Re-glazed",
      "Cleaning"
    ];
    let microwave = [
      { name: "microwave", value: "white", checked: "" },
      { name: "microwave", value: "stainless", checked: "" }
    ];

    let dishwasher = [
      { name: "dishwasher", value: "white", checked: "" },
      { name: "dishwasher", value: "stainless", checked: "" }
    ];
    let dishwasher1 = [
      { name1: "dishwasher1", value1: "standard", checked1: "" },
      { name1: "dishwasher1", value1: "small", checked1: "" }
    ];
    let refrigeRator = [
      { name: "refrigeRator1", value: "white", checked: "" },
      { name: "refrigeRator1", value: "stainless", checked: "" }
    ];
    let refrigeRator1 = [
      { name1: "refrigeRator", value1: "standard", checked1: "" },
      { name1: "refrigeRator", value1: "small", checked1: "" }
    ];
    let stove = [
      { name: "stove1", value: "gas", dataName: "Stove1" },
      { name: "stove1", value: "electric", dataName: "Stove1" }
    ];
    let stove1 = [
      { name: "stove2", value: "30", dataName: "Stove2" },
      { name: "stove2", value: "24", dataName: "Stove2" },
      { name: "stove2", value: "20", dataName: "Stove2" }
    ];
    let stove2 = [
      { name: "stove3", value: "white", dataName: "Stove3" },
      { name: "stove3", value: "stainless", dataName: "Stove3" }
    ];
    let ac = [
      { name: "ac", value: "Rear Vent", dataName: "AC" },
      { name: "ac", value: "Standard", dataName: "AC" },
      { name: "ac", value: "A/C Heater", dataName: "AC" }
    ];
    let ac1 = [
      { name: "ac1", value: "12,000", dataName: "AC1" },
      { name: "ac1", value: "10,000", dataName: "AC1" },
      { name: "ac1", value: "8,000", dataName: "AC1" }
    ];
    let appliances = [
      { type: "refrigeRator", name: "Refrige rator" },
      { type: "Microwave", name: "Microwave" },
      { type: "Dishwasher", name: "Dishwasher" },
      { type: "AC", name: "A/C" },
      { type: "Stove", name: "Stove" }
    ];
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
    let appliancesName = [];
    let appliancesName1 = [];
    let allApp = ["Refrige Rator", "Microwave", "Dishwasher"];
    let rooms = getRooms();
    this.state = {
      stove,
      stove1,
      stove2,
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
      showModalInputOther,
      buttons,
      microwave,
      appliances,
      dishwasher1,
      dishwasher,
      refrigeRator1,
      refrigeRator,
      appliancesName,
      appliancesName1,
      ac,
      ac1
    };
  }

  render() {
    const bla = JSON.parse(localStorage.getItem("workorder"))[
      JSON.parse(localStorage.getItem("questions"))
    ];

    const checked = JSON.parse(localStorage.getItem("Refrige rator1"));
    let checkedQuestions = [];
    if (JSON.parse(localStorage.getItem("checkedQuestions"))) {
      checkedQuestions = JSON.parse(localStorage.getItem("checkedQuestions"));
    } else {
      checkedQuestions = [];
    }

    let isLoading = false;
    const stove = this.state.stove;
    const stove1 = this.state.stove1;
    const stove2 = this.state.stove2;

    const ac = this.state.ac;
    const ac1 = this.state.ac1;
    const appliancesName = this.state.appliancesName;
    const appliancesName1 = this.state.appliancesName1;
    const active = this.state.active;
    const appliances = this.state.appliances;
    console.log("act", active === "refrigeRator");
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
    let other = false;
    let button = this.state.button.toLowerCase();
    if (JSON.parse(localStorage.getItem("checkedQuestions"))) {
      if (JSON.parse(localStorage.getItem("checkedQuestions"))[button]) {
        other = JSON.parse(localStorage.getItem("checkedQuestions"))[button][
          "other"
        ];
      } else {
      }
    }

    let value2 = this.state.value2;
    // let value3 = this.state.value3;
    // console.log(typeof this.state.buildingNum);
    let showing = this.state.showing;
    let saved = false;
    // let isLoading = this.state.isLoading;
    let isLoadingFullRoom = this.state.isLoadingFullRoom;
    console.log("APPLIANCES NAME", appliancesName);
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
    let makeReady = false;
    const showModalInputOther = this.state.showModalInputOther;
    if (JSON.parse(localStorage.getItem("makeReady"))) {
      makeReady = JSON.parse(localStorage.getItem("makeReady"));
    }
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
              🏙 Home
            </button>
          </div>
          {this.state.start && !this.state.isLoading ? (
            <button
              onClick={() => this.handleFinishedButton()}
              className="btn btn-primary m-3"
            >
              Forward ➔
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
          <div className="row m-2 questions">
            {!makeReady ? (
              <div className="col-sm-3">
                <button
                  onClick={() => this.handleMakeReady()}
                  className="btn btn-outline-primary btn-lg m-1"
                >
                  Make Ready
                </button>
              </div>
            ) : null}
            {!makeReady ? (
              <div className="col-sm-9">
                {this.state.buttons.map(button => (
                  <button
                    className=" btn  btn-primary  m-1"
                    onClick={() => this.handleShow(button)}
                  >
                    {button}
                  </button>
                ))}

                {/* <button
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
              </button> */}

                {/* <Button variant="primary" onClick={this.handleShow}>
              Launch demo modal
            </Button> */}

                <Modal show={this.state.setShow} onHide={this.handleClose}>
                  <Modal.Header id="modal-styling-title" closeButton>
                    <div className="row">
                      <div className="col-12 text-center">
                        <Modal.Title className="btn btn-outline-info">
                          {" "}
                          {button.toUpperCase()}
                        </Modal.Title>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      {button == "appliances" ? (
                        <div className="row">
                          {appliances.map(app => (
                            <div className="m-3">
                              <button
                                onClick={e =>
                                  this.handleAppliances(e, app.type)
                                }
                                className={
                                  active === app.type
                                    ? "btn btn-sm btn-success p-1 active"
                                    : "btn btn-sm btn-warning p-1"
                                }
                                // className={`btn btn-sm btn-warning mr-1 ${active}`}
                              >
                                {app.name}
                              </button>
                              {/* <button
                              onClick={e =>
                                this.handleAppliances(e, "Microwave")
                              }
                              className="btn btn-sm btn-warning m-1"
                            >
                              Microwave
                            </button>
                            <button
                              onClick={e =>
                                this.handleAppliances(e, "Dishwasher")
                              }
                              className="btn btn-sm btn-warning m-1"
                            >
                              Dishwasher
                            </button>{" "}
                            <button
                              onClick={e => this.handleAppliances(e, "Stove")}
                              className="btn btn-sm btn-warning m-1"
                            >
                              Stove
                            </button>{" "}
                            <button
                              onClick={e => this.handleAppliances(e, "AC")}
                              className="btn btn-sm btn-warning m-1"
                            >
                              A/C
                            </button> */}
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {button !== "appliances" ? (
                        <div className="col-12 m-3">
                          {/* <h3 className="text-center">{button}</h3> */}
                          <input
                            className="m-3"
                            type="radio"
                            name={button}
                            checked={
                              checkedQuestions[button]
                                ? checkedQuestions[button]["yes"]
                                : null
                            }
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
                            checked={
                              checkedQuestions[button]
                                ? checkedQuestions[button]["no"]
                                : null
                            }
                            onClick={e => this.handleOptionNo(e)}
                          />
                          No
                          <br />
                          <input
                            className="m-3"
                            type="radio"
                            name={button}
                            value="other"
                            checked={
                              checkedQuestions[button + "1"]
                                ? checkedQuestions[button + "1"]["other"]
                                : ""
                            }
                            onClick={e => this.handleOptionOther(e)}
                          />
                          Other
                          <br />
                          {showModalInputOther || other ? (
                            <textarea
                              onChange={e => this.handleOptionOtherComment(e)}
                              placeholder="Comment"
                              name={button}
                              id=""
                              cols="50"
                              rows="5"
                              className="option-other"
                              value={
                                checkedQuestions[button]
                                  ? checkedQuestions[button]["other"]
                                  : ""
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        //           showModalInputOther?(
                        //           <textarea
                        //             onChange = { e => this.handleOptionOtherComment(e)}
                        //     placeholder="Comment"
                        //             name={button}
                        //             id=""
                        //     cols="50"
                        //     rows="5"
                        //   />
                        // ) : null
                        // <div className="col-12">
                        //   <div className="col-12">
                        //     <button
                        //       onClick={e =>
                        //         this.handleAppliances(e, "refrigeRator")
                        //       }
                        //       className="btn btn-sm btn-warning mr-1"
                        //     >
                        //       {" "}
                        //       Refrige rator
                        //     </button>
                        //     <button
                        //       onClick={e => this.handleAppliances(e, "Microwave")}
                        //       className="btn btn-sm btn-warning m-1"
                        //     >
                        //       Microwave
                        //     </button>
                        //     <button
                        //       onClick={e =>
                        //         this.handleAppliances(e, "Dishwasher")
                        //       }
                        //       className="btn btn-sm btn-warning m-1"
                        //     >
                        //       Dishwasher
                        //     </button>{" "}
                        //     <button
                        //       onClick={e => this.handleAppliances(e, "Stove")}
                        //       className="btn btn-sm btn-warning m-1"
                        //     >
                        //       Stove
                        //     </button>{" "}
                        //     <button
                        //       onClick={e => this.handleAppliances(e, "AC")}
                        //       className="btn btn-sm btn-warning m-1"
                        //     >
                        //       A/C
                        //     </button>
                        //   </div>

                        <div className="col-12">
                          {appliancesName != "stove" &&
                          appliancesName != "ac" ? (
                            <div className="col-12">
                              {appliancesName.map(app => (
                                <div className="col-6">
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app.name}
                                    name={app.name}
                                    value={app.value}
                                    checked={
                                      checkedQuestions[app.name]
                                        ? checkedQuestions[app.name][app.value]
                                        : app.checked
                                    }
                                    onChange={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app.value}
                                </div>
                              ))}
                              <br />
                              <br />
                            </div>
                          ) : null}

                          {appliancesName != "stove" &&
                          appliancesName != "ac" &&
                          appliancesName1 ? (
                            <div className="col-12">
                              {appliancesName1.map(app1 => (
                                <div className="col-6">
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app1.name1}
                                    name={app1.name1}
                                    value={app1.value1}
                                    checked={
                                      checkedQuestions[app1.name1]
                                        ? checkedQuestions[app1.name1][
                                            app1.value1
                                          ]
                                        : app1.checked1
                                    }
                                    onChange={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app1.value1}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {/* <input
                                className="m-3"
                                type="radio"
                                data-name={appliancesName}
                                name={appliancesName}
                                value="Stainless"
                                onClick={e => this.handleAppliancesOptions(e)}
                              />
                              Stainless
                              <br />
                            </div>
                            <div>
                              <input
                                className="m-3"
                                type="radio"
                                data-name={appliancesName + "1"}
                                name={appliancesName + "1"}
                                value="Standard"
                                onClick={e => this.handleAppliancesOptions(e)}
                              />
                              Standard
                              <input
                                className="m-3"
                                type="radio"
                                data-name={appliancesName + "1"}
                                name={appliancesName + "1"}
                                value="Small"
                                onClick={e => this.handleAppliancesOptions(e)}
                              />
                              Small
                            </div> */}
                          {appliancesName == "stove" ? (
                            <div>
                              {stove.map(app => (
                                <div>
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app.dataName}
                                    name={app.name}
                                    value={app.value}
                                    checked={
                                      checkedQuestions[app.name]
                                        ? checkedQuestions[app.name][app.value]
                                        : null
                                    }
                                    onClick={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app.value}
                                </div>
                              ))}

                              <br />
                              {stove1.map(app => (
                                <div>
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app.dataName}
                                    name={app.name}
                                    value={app.value}
                                    checked={
                                      checkedQuestions[app.name]
                                        ? checkedQuestions[app.name][app.value]
                                        : null
                                    }
                                    onClick={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app.value}
                                </div>
                              ))}
                              <br />
                              {stove2.map(app => (
                                <div>
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app.dataName}
                                    name={app.name}
                                    value={app.value}
                                    checked={
                                      checkedQuestions[app.name]
                                        ? checkedQuestions[app.name][app.value]
                                        : null
                                    }
                                    onClick={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app.value}
                                </div>
                              ))}
                              {/* <input
                                  className="m-3"
                                  type="radio"
                                  data-name="Stove"
                                  checked={
                                    JSON.parse(localStorage.getItem(app.name))
                                      ? JSON.parse(
                                          localStorage.getItem(app.name)
                                        )[app.value]
                                      : null
                                  }
                                  name="stove1"
                                  value="electric"
                                  onClick={e => this.handleAppliancesOptions(e)}
                                />
                                Electric
                                <br />
                                <input
                                  className="m-3"
                                  data-name="Stove1"
                                  type="radio"
                                  name="stove2"
                                  value="30"
                                  checked={
                                    JSON.parse(localStorage.getItem(app.name))
                                      ? JSON.parse(
                                          localStorage.getItem(app.name)
                                        )[app.value]
                                      : null
                                  }
                                  onClick={e => this.handleAppliancesOptions(e)}
                                />
                                30"
                                <input
                                  className="m-3"
                                  type="radio"
                                  data-name="Stove1"
                                  name="stove2"
                                  value="24"
                                  checked={
                                    JSON.parse(localStorage.getItem(app.name))
                                      ? JSON.parse(
                                          localStorage.getItem(app.name)
                                        )[app.value]
                                      : null
                                  }
                                  onClick={e => this.handleAppliancesOptions(e)}
                                />
                                24"
                                <input
                                  className="m-3"
                                  type="radio"
                                  data-name="Stove1"
                                  name="stove2"
                                  value="20"
                                  checked={
                                    JSON.parse(localStorage.getItem(app.name))
                                      ? JSON.parse(
                                          localStorage.getItem(app.name)
                                        )[app.value]
                                      : null
                                  }
                                  onClick={e => this.handleAppliancesOptions(e)}
                                />
                                20" <br /> */}
                              {/* <input
                                  className="m-3 p-3"
                                  type="radio"
                                  data-name="Stove2"
                                  name="stove3"
                                  value="White"
                                  checked={
                                    JSON.parse(localStorage.getItem(app.name))
                                      ? JSON.parse(
                                          localStorage.getItem(app.name)
                                        )[app.value]
                                      : null
                                  }
                                  onClick={e => this.handleAppliancesOptions(e)}
                                />
                                White
                                <input
                                  className="m-3 p-3"
                                  type="radio"
                                  data-name="Stove2"
                                  name="stove3"
                                  value="Stainless"
                                  checked={
                                    JSON.parse(localStorage.getItem(app.name))
                                      ? JSON.parse(
                                          localStorage.getItem(app.name)
                                        )[app.value]
                                      : null
                                  }
                                  onClick={e => this.handleAppliancesOptions(e)}
                                />
                                Stainless <br /> */}
                            </div>
                          ) : null}
                          {appliancesName == "ac" ? (
                            <div>
                              {ac.map(app => (
                                <div>
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app.dataName}
                                    name={app.name}
                                    value={app.value}
                                    checked={
                                      checkedQuestions[app.name]
                                        ? checkedQuestions[app.name][app.value]
                                        : null
                                    }
                                    onClick={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app.value}
                                </div>
                              ))}
                              <br />

                              {ac1.map(app => (
                                <div>
                                  <input
                                    className="m-3"
                                    type="radio"
                                    data-name={app.dataName}
                                    name={app.name}
                                    value={app.value}
                                    checked={
                                      checkedQuestions[app.name]
                                        ? checkedQuestions[app.name][app.value]
                                        : null
                                    }
                                    onClick={e =>
                                      this.handleAppliancesOptions(e)
                                    }
                                  />
                                  {app.value}
                                </div>
                              ))}
                              {/* <input
                              className="m-3"
                              type="radio"
                              data-name="AC"
                              name={button}
                              value="Rear Vent"
                              // checked={
                              //   JSON.parse(localStorage.getItem(app.name))
                              //     ? JSON.parse(localStorage.getItem(app.name))[
                              //         app.value
                              //       ]
                              //     : null
                              // }
                              onClick={e => this.handleAppliancesOptions(e)}
                            />
                            Rear Vent
                            <input
                              className="m-3"
                              type="radio"
                              data-name="AC"
                              name={button}
                              value="Standard"
                              onClick={e => this.handleAppliancesOptions(e)}
                            />
                            Standard
                            <input
                              className="m-3"
                              type="radio"
                              data-name="AC"
                              name={button}
                              value="A/C Heater"
                              onClick={e => this.handleAppliancesOptions(e)}
                            />
                            A/C Heater
                             className="m-3"
                              type="radio"
                              data-name="AC1"
                              name={button}
                              value="12,000"
                              onClick={e => this.handleAppliancesOptions(e)}
                            />
                            12,000
                            <input
                              className="m-3"
                              type="radio"
                              data-name="AC1"
                              name={button}
                              value="10,000"
                              onClick={e => this.handleAppliancesOptions(e)}
                            />
                            10,000
                            <input
                              className="m-3"
                              type="radio"
                              data-name="AC1"
                              name={button}
                              value="8,000"
                              onClick={e => this.handleAppliancesOptions(e)}
                            />
                            8,000
                            <br />
                          </div>
                        ) : null}               <br /> */}
                            </div>
                          ) : null}
                        </div>
                      )}
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
            ) : null}
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
