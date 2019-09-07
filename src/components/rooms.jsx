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
    this.setState({ start: true, isLoadingFullRoom: false, isLoading: true });

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

      const data1 = await axios.post(
        process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
        JSON.stringify(finalData)
      );

      if (data1.data) {
        let _id = data1.data._id;
        work._id = _id;

        localStorage.setItem("workorder", JSON.stringify(work));
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
        console.log(this.props);
        allItems = checked.concat(unchecked);
        localStorage.setItem("allItems", JSON.stringify(allItems));
        const region = JSON.parse(localStorage.getItem("currentUser")).region;
        this.props.history.push("/rooms/" + id + "/" + region);
      }
    }
  };

  async handleAsync() {
    this.setState({ start: true, isLoadingFullRoom: false });
    const work = JSON.parse(localStorage.getItem("workorder"));
    if (work.buildingNumber && work.apartmentNumber) {
      let finalData = {};

      finalData.buildingNumber = work.buildingNumber;
      finalData.apartmentNumber = work.apartmentNumber;
      finalData.userId = work.userId;

      const data1 = await axios.get(
        process.env.REACT_APP_API_URL + "/user/allItems"
      );

      // this.setState({ isLoading: false });

      localStorage.setItem("allItems", JSON.stringify(data1.data.items));
      if (data1.statusText === "OK") {
        const data2 = await axios.post(
          process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
          JSON.stringify(finalData)
        );

        if (data2.statusText === "OK") {
          this.setState({
            isLoadingFullRoom: true
          });
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

          if (data2.data._id) {
            let _id = data2.data._id;
            work._id = _id;

            localStorage.setItem("workorder", JSON.stringify(work));
          }
        }
      }
      // let start = true;

      // localStorage.setItem("startBtn", JSON.stringify(start));
      // this.setState({ start: true, isLoading: false });
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

    if (this.state.start || this.props.location.state) {
      let allItems = JSON.parse(localStorage.getItem("allItems"));
      if (this.props.location.state) {
        const buildNumber = this.props.location.state.buildingNumber;

        let building = buildings.find(m => m.number == buildNumber);

        const adress = building.adress + " (" + building.zip + ")";

        const work = JSON.parse(localStorage.getItem("workorder"));

        if (this.state.start) {
          let checkedJobs = this.props.location.state.jobs;
          let k = checkedJobs.filter(j => allItems.filter(m => m._id == j._id));

          let j = checkedJobs.map(j => j).map(m => m._id);
          let p = allItems.filter(d => d._id != j.find(m => m == d._id));

          allItems = k.concat(p);

          localStorage.setItem("allItems", JSON.stringify(allItems));
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

  async handleHomeButton() {
    if (JSON.parse(localStorage.getItem("allItems"))) {
      const work = JSON.parse(localStorage.getItem("workorder"));
      const allItems = JSON.parse(localStorage.getItem("allItems"));
      let jobs = [...allItems].filter(m => m.checked === true);

      work.autosaveTime = new Date();
      if (jobs != null) {
        work.jobs = jobs;
      }
      work.checkedQuestions = JSON.parse(
        localStorage.getItem("checkedQuestions")
      );

      localStorage.setItem("workorder", JSON.stringify(work));
      const finalData = JSON.parse(localStorage.getItem("workorder"));

      const data = await axios.post(
        process.env.REACT_APP_API_URL + "/user/newTempWorkorder",
        JSON.stringify(finalData)
      );

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
    } else {
      localStorage.removeItem("chosenOpt");
      const region = JSON.parse(localStorage.getItem("currentUser")).region;
      this.props.history.push(`/rooms/${region}`);
      document.location.reload();
    }
  }

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
      this.props.history.push(
        "/rooms/" + this.props.match.params.id + "/work-order"
      );

      const date = new Date();
      work.completedTime = date;
      localStorage.setItem("workorder", JSON.stringify(work));
    }
  };

  handleInput = e => {
    const { showing } = this.state;

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
    let start = true;

    localStorage.setItem("startBtn", JSON.stringify(start));
    this.setState({ start: true, isLoading: false, startMakeReady: true });
    let makeReady = true;
    localStorage.setItem("makeReady", JSON.stringify(makeReady));
    this.setState({ makeReady: true });
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    // let jobs = [...allItems].filter(m => m.checked === true);
    // const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));

    // work.autosaveTime = new Date();
    // if (jobs != null) {
    //   work.jobs = jobs;
    // }
    work.checkedQuestions = JSON.parse(
      localStorage.getItem("checkedQuestions")
    );

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

      const data1 = await axios.post(
        process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
        JSON.stringify(finalData)
      );

      if (data1.data) {
        let _id = data1.data._id;
        work._id = _id;

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
      }
    }
  }
  handleOptionOther = e => {
    const value = e.target.value;
    const optionOther = this.state.optionOther;
    const name = e.currentTarget.name.toLowerCase();
    const showModalInputOther = this.state.showModalInputOther;

    const work = JSON.parse(localStorage.getItem("workorder"));
    work.questions = { ...work.questions };

    localStorage.setItem("workorder", JSON.stringify(work));
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

    this.setState({ showModalInputOther: true, checkedQuestions });
  };
  handleOptionOtherComment = e => {
    const value = e.target.value;
    const name = e.currentTarget.name;
    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));

    work.questions = { ...work.questions, [name]: value };
    localStorage.setItem("workorder", JSON.stringify(work));

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

    this.setState({ optionOther: value });
  };
  handleOptionYes = e => {
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
    const value = e.target.value;
    let name = e.target.attributes.getNamedItem("name").value;

    const showModalInputOther = this.state.showModalInputOther;
    const work = JSON.parse(localStorage.getItem("workorder"));

    let name1 = name;

    work.questions.appliances = {
      ...work.questions.appliances,
      [name]: [value]
    };

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
    const work = JSON.parse(localStorage.getItem("workorder"));

    if (!work.questions) {
      work.questions = {};
      localStorage.setItem("workorder", JSON.stringify(work));
    }

    const checked = JSON.parse(localStorage.getItem("checkedQuestions"));

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

      this.setState({
        active: name,
        stove,
        stove1,
        stove2,
        appliancesName: name.toLowerCase()
      });
    } else if (name.toLowerCase() == "microwave") {
      this.setState({
        active: name,
        appliancesName: this.state.microwave,
        appliancesName1: false
      });
    } else if (name.toLowerCase() == "dishwasher") {
      this.setState({
        active: name,
        appliancesName: this.state.dishwasher,
        appliancesName1: this.state.dishwasher1
      });
    } else {
      this.setState({
        active: name,
        appliancesName: this.state.refrigeRator,
        appliancesName1: this.state.refrigeRator1
      });
    }
  }

  constructor(props) {
    super(props);

    const setShow = false;
    const showModalInputOther = false;

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
    let startMakeReady = false;
    let appliancesName = [];
    let appliancesName1 = [];
    let allApp = ["Refrige Rator", "Microwave", "Dishwasher"];
    let rooms = getRooms();
    this.state = {
      startMakeReady,
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
    let chosenOptNew = false;
    const bla = JSON.parse(localStorage.getItem("workorder"))[
      JSON.parse(localStorage.getItem("questions"))
    ];

    const checked = JSON.parse(localStorage.getItem("Refrige rator1"));
    if (JSON.parse(localStorage.getItem("chosenOpt")) == "new") {
      chosenOptNew = true;
    }

    let checkedQuestions = [];
    if (JSON.parse(localStorage.getItem("checkedQuestions"))) {
      checkedQuestions = JSON.parse(localStorage.getItem("checkedQuestions"));
    } else {
      checkedQuestions = [];
    }
    const startMakeReady = JSON.parse(localStorage.getItem("makeReady"));
    let isLoading = this.state.isLoading;
    const stove = this.state.stove;
    const stove1 = this.state.stove1;
    const stove2 = this.state.stove2;

    const ac = this.state.ac;
    const ac1 = this.state.ac1;
    const appliancesName = this.state.appliancesName;
    const appliancesName1 = this.state.appliancesName1;
    const active = this.state.active;
    const appliances = this.state.appliances;

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

    let showing = this.state.showing;
    let saved = false;

    let isLoadingFullRoom = this.state.isLoadingFullRoom;

    if (JSON.parse(localStorage.getItem("chosenOpt")) == "saved") {
      saved = true;
    }

    let workorder = JSON.parse(localStorage.getItem("workorder"));
    let value = "";
    value = this.state.value;
    value = workorder.apartmentNumber;

    let building = "";

    if (this.state.buildingNum && workorder.adress != undefined) {
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
    const start = JSON.parse(localStorage.getItem("startBtn"));
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
          {start && startMakeReady && isLoadingFullRoom ? (
            <button
              onClick={() => this.handleBackButton()}
              className="btn btn-warning m-3"
            >
              ⏎ Back
            </button>
          ) : null}

          {isLoadingFullRoom ? (
            <div className="float-left">
              <button
                onClick={() => this.handleHomeButton()}
                className="btn btn-info m-3"
              >
                🏙 Home
              </button>
            </div>
          ) : null}

          {start && startMakeReady && isLoadingFullRoom ? (
            <button
              onClick={() => this.handleFinishedButton()}
              className="btn btn-primary m-3"
            >
              Forward ➔
            </button>
          ) : null}
          {!this.state.start && chosenOptNew ? (
            <button
              onClick={() => this.handleAsync()}
              className="btn btn-success m-3"
            >
              {saved ? "Continue Saved Workorder" : "Start"}
            </button>
          ) : null}

          {isLoading || !isLoadingFullRoom ? (
            <div className="col-6 m-3 m-auto">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}

          {isLoadingFullRoom ? (
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3 float-right"
            >
              &#x2716; Logout
            </button>
          ) : null}

          {this.state.start && value && isLoadingFullRoom && !startMakeReady ? (
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
                      key={button}
                      className="btn  btn-primary  m-1"
                      onClick={() => this.handleShow(button)}
                    >
                      {button}
                    </button>
                  ))}

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
                      <div className="row ">
                        {button == "appliances" ? (
                          <div className="row m-1">
                            {appliances.map(app => (
                              <div className="m-1">
                                <button
                                  onClick={e =>
                                    this.handleAppliances(e, app.type)
                                  }
                                  className={
                                    active === app.type
                                      ? "btn btn-sm btn-success p-1 active"
                                      : "btn btn-sm btn-warning p-1"
                                  }
                                >
                                  {app.name}
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {button !== "appliances" ? (
                          <div className="col-12 m-1">
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
                                          ? checkedQuestions[app.name][
                                              app.value
                                            ]
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
                                          ? checkedQuestions[app.name][
                                              app.value
                                            ]
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
                                          ? checkedQuestions[app.name][
                                              app.value
                                            ]
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
                                          ? checkedQuestions[app.name][
                                              app.value
                                            ]
                                          : null
                                      }
                                      onClick={e =>
                                        this.handleAppliancesOptions(e)
                                      }
                                    />
                                    {app.value}
                                  </div>
                                ))}
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
                                          ? checkedQuestions[app.name][
                                              app.value
                                            ]
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
                                          ? checkedQuestions[app.name][
                                              app.value
                                            ]
                                          : null
                                      }
                                      onClick={e =>
                                        this.handleAppliancesOptions(e)
                                      }
                                    />
                                    {app.value}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {this.state.start && value && makeReady ? (
          <div className="row">
            {this.state.rooms.map(room => (
              <div key={room.id} className="col-4 p-3">
                <div className="card mb-3 text-center">
                  <Link
                    className="links"
                    onClick={() => this.handleLinks(room.id)}
                    // to="null"
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
