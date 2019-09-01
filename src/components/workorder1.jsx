import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import _ from "lodash";
import axios from "axios";

import "../css/workorder.css";

class Wo extends Component {
  state = {
    allItems: {}
  };
  saveStateToLocalStorage() {
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    localStorage.setItem("allItems", JSON.stringify(allItems));
  }
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.clear();
      document.location = "/";
    }
  }

  componentDidMount() {}
  handleLevels = e => {
    let work = JSON.parse(localStorage.getItem("workorder"));

    work.level = e.target.value;

    localStorage.setItem("workorder", JSON.stringify(work));
  };
  handleGeneralNotes = e => {
    let woComment = e.target.value;
    this.setState({ woComment });
  };
  handleBackButton = url => {
    const region = JSON.parse(localStorage.getItem("currentUser")).region;

    this.props.history.push("/rooms/" + region);
  };

  handlePrintButton = () => {
    window.print();
  };
  handleFinishedButton = async () => {
    let prompt = window.confirm(
      "Are you sure you want to send this workorder?"
    );
    if (prompt) {
      const allItems = JSON.parse(localStorage.getItem("allItems"));
      const copyItems = [...allItems].filter(item => {
        return item.checked;
      });
      const finalItems = copyItems.map(item => {
        return {
          name: item.name,
          price: item.price,
          room: item.room,
          subCategory: item.subCategory,
          quantity: item.quantity,
          comment: item.comment
        };
      });
      const finalData = JSON.parse(localStorage.getItem("workorder"));

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const total = this.state.total;
      const woComment = this.state.woComment;

      let work = {};
      work.workorder = {};

      work.jobs = finalItems;
      work.user = currentUser;
      if (finalData._id) {
        work.tempWorkorderId = finalData._id;
      }
      work.workorder.questions = { ...finalData.questions };
      if (work.workorder.questions.appliances) {
        work.workorder.questions.appliances = {
          stove: [],
          dishwasher: [],
          microwave: [],
          ac: [],
          refrigeRator: []
        };
        if (finalData.questions.appliances.stove1) {
          work.workorder.questions.appliances.stove.push(
            finalData.questions.appliances.stove1[0]
          );
        }
        if (finalData.questions.appliances.stove2) {
          work.workorder.questions.appliances.stove.push(
            finalData.questions.appliances.stove2[0]
          );
        }
        if (finalData.questions.appliances.stove3) {
          work.workorder.questions.appliances.stove.push(
            finalData.questions.appliances.stove3[0]
          );
        }

        if (finalData.questions.appliances.microwave) {
          work.workorder.questions.appliances.microwave.push(
            finalData.questions.appliances.microwave[0]
          );
        }
        if (finalData.questions.appliances.dishwasher) {
          work.workorder.questions.appliances.dishwasher.push(
            finalData.questions.appliances.dishwasher[0]
          );
        }
        if (finalData.questions.appliances.dishwasher1) {
          work.workorder.questions.appliances.dishwasher.push(
            finalData.questions.appliances.dishwasher1[0]
          );
        }
        if (finalData.questions.appliances.refrigeRator) {
          work.workorder.questions.appliances.refrigeRator.push(
            finalData.questions.appliances.refrigeRator[0]
          );
        }
        if (finalData.questions.appliances.refrigeRator1) {
          work.workorder.questions.appliances.refrigeRator.push(
            finalData.questions.appliances.refrigeRator1[0]
          );
        }
        if (finalData.questions.appliances.ac) {
          work.workorder.questions.appliances.ac.push(
            finalData.questions.appliances.ac[0]
          );
        }
        if (finalData.questions.appliances.ac1) {
          work.workorder.questions.appliances.ac.push(
            finalData.questions.appliances.ac1[0]
          );
        }
      }

      work.workorder.loginTime = new Date(finalData.loginTime);
      work.workorder.level = finalData.level;

      work.workorder.completedTime = new Date();
      work.workorder.buildingNumber = finalData.buildingNumber;
      work.workorder.apartmentNumber = finalData.apartmentNumber;
      work.workorder.squareFeet = finalData.squareFeet;
      work.workorder.adress = finalData.adress;
      work.workorder.userId = finalData.userId;
      work.workorder.totalPrice = total;
      work.workorder.comment = woComment;
      work.workorder.sendTime = new Date();

      // let jobs=work.jobs
      //  let id= finalData._id
      // delete work._id;
      // localStorage.setItem("workorder", JSON.stringify(work));

      const data = await axios.post(
        process.env.REACT_APP_API_URL + "/user/newWorkorder",
        JSON.stringify(work)
      );

      if (data.statusText === "OK") {
        const work = JSON.parse(localStorage.getItem("workorder"));
        // localStorage.removeItem("jobs");
        work.buildingNumber = "";
        work.apartmentNumber = "";
        work.totalPrice = "";
        work.comment = "";
        work.adress = "";
        work.autosaveTime = "";
        work.level = "";
        work.squareFeet = "";
        work.questions = "";
        delete work.jobs;
        delete work._id;
        work.loginTime = new Date();
        localStorage.setItem("workorder", JSON.stringify(work));

        localStorage.removeItem("jobs");
        localStorage.removeItem("makeReady");
        localStorage.removeItem("checkedQuestions");
        localStorage.removeItem("startBtn");
        localStorage.removeItem("building");

        // window.location = "/rooms/" + region;
        // localStorage.removeItem("workorder");
      }
      let region = JSON.parse(localStorage.getItem("currentUser")).region;

      this.props.history.push(`/rooms/${region}`);
      document.location.reload();
    }
  };
  constructor(props) {
    super(props);
    let total = 0;
    let woComment = "";
    let allItems = JSON.parse(localStorage.getItem("allItems"));
    let jobs = [...allItems].filter(m => m.checked === true);
    if (jobs != undefined) {
      for (let i = 0; i < jobs.length; i++) {
        total += jobs[i].quantity * jobs[i].price;
      }
      total = total.toFixed(2);
    }

    this.state = {
      total,

      woComment
    };
  }
  render() {
    let jobs = "";

    let total = this.state.total;

    const allItems = JSON.parse(localStorage.getItem("allItems"));

    jobs = [...allItems].filter(m => m.checked === true);

    const showing = true;
    const adress = JSON.parse(localStorage.getItem("workorder")).adress;

    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const userName = JSON.parse(localStorage.getItem("currentUser")).name;
    const userEmail = JSON.parse(localStorage.getItem("currentUser")).email;
    const buildingNumber = workorder.buildingNumber;
    const address = workorder.adress;
    const value = workorder.apartmentNumber;
    const value2 = workorder.squareFeet;
    return (
      <React.Fragment>
        <div className="container main-page">
          <NavBar
            {...this.props}
            adress={adress}
            showing={showing}
            build={buildingNumber}
            value={value}
            value2={value2}
            classs="disabled"
            onHandleAptNum={this.handleAptNum}
            onHandleSquare={this.handleSquare}
            onChangeBuildings={() => this.handleChangeBuilding()}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="work-order border text-center mt-3">
            <h1 className="m-3">Work Order</h1>
            <span>
              <p>
                Name: {userName} <br />
                Email: {userEmail} <br />
                Address: {address} <br />
                Building Number: {buildingNumber} <br />
                Apartment Number: {value} <br />
                Square Footage: {value2}
              </p>
            </span>
            <table className="table text-left">
              <thead>
                <tr>
                  <th className="itemWo">Room</th>
                  <th className="itemWo">Item</th>
                  <th className="itemWo">SubCategory</th>
                  <th className="itemWo">#</th>
                  <th className="itemWo">Price</th>
                  <th className="itemWo">Total Price</th>
                  {/* <th>Comment</th> */}
                </tr>
              </thead>
              {jobs
                ? jobs.map(item => (
                    <tbody>
                      <tr>
                        <td className="itemTd"> {item.room}</td>
                        <td className="itemTd"> {item.name}</td>
                        <td className="itemTd"> {item.subCategory}</td>
                        <td className="itemTd"> {item.quantity}</td>
                        <td className="itemTd"> {item.price}</td>
                        <td className="itemTd">
                          $
                          {(item.quantity * item.price).toFixed(2)
                            ? (item.quantity * item.price).toFixed(2)
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
                        <td colSpan="6">
                          <textarea
                            disabled
                            className="form-control placeholder-input"
                          >
                            {item.comment}
                          </textarea>
                        </td>
                      </tr>
                    </tbody>
                  ))
                : null}
              <tbody>
                <tr>
                  <td colSpan="2" />
                  <td className="itemTd text-right" colSpan="3">
                    Total Price:
                  </td>
                  <td className="itemTd">
                    <div>${total}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <textarea
              className="text-area"
              placeholder="General Notes"
              onChange={this.handleGeneralNotes}
              name=""
              id=""
            />
            <div className="col-sm-12">
              <label>
                Pick Level
                <select onChange={this.handleLevels}>
                  <option value="1" />
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
            </div>

            {/* <label className="btn btn-secondary ">Workorders</label> */}

            <div className="buttons">
              <button
                onClick={() => this.handleBackButton()}
                className="btn btn-warning m-3"
              >
                ⏎ Cancel
              </button>
              <button
                className="btn btn-success m-3"
                onClick={this.handlePrintButton}
              >
                Print
              </button>

              <button
                onClick={() => this.handleFinishedButton()}
                className="btn btn-primary m-3"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Wo;
