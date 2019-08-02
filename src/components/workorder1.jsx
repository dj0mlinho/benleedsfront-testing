import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import _ from "lodash";
import axios from "axios";

import "../css/workorder.css";

class Wo extends Component {
  state = {
    allItems: {}
    // jobsList: getItemList()
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
  componentDidMount() {
    // this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );
  }
  handleGeneralNotes = e => {
    // let woComment = this.state.woComment;
    // console.log(e.target.value);
    let woComment = e.target.value;
    this.setState({ woComment });
  };
  handleBackButton = url => {
    // console.log(this.props.match.params.m);
    const region = JSON.parse(localStorage.getItem("currentUser")).region;
    console.log(this.props.match.params);
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
      const jobs = JSON.parse(localStorage.getItem("jobs"));
      const copyItems = [...jobs].filter(item => {
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
      // console.log(woComment);
      let work = {};
      work.workorder = {};
      // work.id = finalData._id;
      work.jobs = finalItems;
      work.user = currentUser;
      if (finalData._id) {
        work.tempWorkorderId = finalData._id;
      }
      work.workorder.loginTime = new Date(finalData.loginTime);
      work.workorder.completedTime = new Date();
      work.workorder.buildingNumber = finalData.buildingNumber;
      work.workorder.apartmentNumber = finalData.apartmentNumber;
      work.workorder.adress = finalData.adress;
      work.workorder.userId = finalData.userId;
      work.workorder.totalPrice = total;
      work.workorder.comment = woComment;
      work.workorder.sendTime = new Date();

      // let jobs=work.jobs
      //  let id= finalData._id
      // delete work._id;
      // localStorage.setItem("workorder", JSON.stringify(work));

      console.log("final data", work);
      const data = await axios.post(
        process.env.REACT_APP_API_URL + "/user/newWorkorder",
        JSON.stringify(work)
      );
      console.log(data);
      if (data.statusText === "OK") {
        const work = JSON.parse(localStorage.getItem("workorder"));
        // localStorage.removeItem("jobs");
        work.buildingNumber = "";
        work.apartmentNumber = "";
        work.totalPrice = "";
        work.comment = "";
        work.adress = "";
        work.autosaveTime = "";
        delete work.jobs;
        delete work._id;
        work.loginTime = new Date();
        localStorage.setItem("workorder", JSON.stringify(work));

        localStorage.removeItem("jobs");
        localStorage.removeItem("startBtn");
        localStorage.removeItem("building");
        let region = JSON.parse(localStorage.getItem("currentUser")).region;

        this.props.history.push(`/rooms/${region}`);
        document.location.reload();

        // window.location = "/rooms/" + region;
        // localStorage.removeItem("workorder");
      }
    } else {
      return;
    }
  };
  constructor(props) {
    super(props);
    let total = 0;
    let woComment = "";
    // let allItems = JSON.parse(localStorage.getItem("allItems"));
    if (localStorage.getItem("jobs")) {
      let jobs = JSON.parse(localStorage.getItem("jobs")).filter(
        m => m.checked == true
      );
      for (let i = 0; i < jobs.length; i++) {
        total += jobs[i].quantity * jobs[i].price;
      }
      total = total.toFixed(2);
    }
    // console.log(total);
    this.state = {
      total,

      woComment
    };
  }
  render() {
    let jobs = "";
    // console.log(this.state.woComment);
    let total = this.state.total;
    if (localStorage.getItem("jobs")) {
      //  jobs = JSON.parse(localStorage.getItem("jobs"));
      // console.log(total);
      jobs = JSON.parse(localStorage.getItem("jobs")).filter(
        m => m.checked == true
      );
    } else {
      jobs = false;
    }
    console.log(jobs);
    const showing = true;
    const adress = JSON.parse(localStorage.getItem("workorder")).adress;
    // const total = this.state.total;
    // const totalprice = this.state.allItems.map(
    //   item => item.quantity * item.price
    // );

    // const total = totalprice.map(item => );
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const buildingNumber = workorder.buildingNumber;
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
            <table className="table text-left">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Item</th>
                  <th>SubCategory</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  {/* <th>Comment</th> */}
                </tr>
              </thead>
              {jobs
                ? jobs.map(item => (
                    <tbody>
                      <tr>
                        <td> {item.room}</td>
                        <td> {item.name}</td>
                        <td> {item.subCategory}</td>
                        <td> {item.quantity}</td>
                        <td> {item.price}</td>
                        <td>
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

              <tr>
                <td colSpan="3" />
                <td colSpan="2">Total Price:</td>
                <td>
                  <div>${total}</div>
                </td>
              </tr>
            </table>

            <textarea
              className="text-area"
              placeholder="General Notes"
              onChange={this.handleGeneralNotes}
              name=""
              id=""
            />

            <div className="buttons">
              <button
                onClick={() => this.handleBackButton()}
                className="btn btn-warning m-3"
              >
                ⏎ Cancel
              </button>
              <button
                className="btn btn-success m-3"
                // placeholder="General Notes"
                onClick={this.handlePrintButton}
                // name=""
                // id=""
                // cols="30"
                // rows="4"
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
