import React from "react";
import NavBar from "./navBar.jsx";
import { Link } from "react-router-dom";
import Form from "./common/form";

import "../css/fullroom.css";

import SearchBox from "./common/searchbox";
import { jsxClosingFragment } from "@babel/types";

class Workorders extends Form {
  state = {
    data: {},
    errors: {},
    rooms: {},
    value: {},
    schema: {},
    checked: [],
    rooms2: {},
    build: []
  };

  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.clear();
      document.location = "/";
    }
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  constructor(props) {
    super(props);
    this.firstInput = React.createRef();

    const allItems = JSON.parse(localStorage.getItem("workorders"));

    const searchQuery = "";
    this.state = {
      allItems,
      searchQuery
    };
  }

  render() {
    let message = false;
    // console.log(this.state.allItems);
    let workorders = JSON.parse(localStorage.getItem("workorders"));
    console.log(workorders);

    if (workorders[0] == undefined) {
      message = true;
    }
    // console.log(workorders);
    // const allItems = this.state.allItems;
    const searchQuery = this.state.searchQuery;

    // console.log(this.state.searchQuery);
    // const searchQuery = this.state.searchQuery;
    // const showing = true;
    // // const adress = [];
    // if (
    //   !JSON.parse(localStorage.getItem("workorder")).workorder.buildingNumber
    // ) {
    // }
    // const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
    //   .buildingNumber;

    // const building = JSON.parse(localStorage.getItem("buildings")).find(
    //   m => m.number == buildNumber
    // );

    // // element.value = element.number + " (" + element.zip + ")";

    // // const { data, errors, checked, renderedItems } = this.state;

    // const adress = building.adress + " (" + building.zip + ")";
    // console.log(searchQuery);

    // if (searchQuery) {
    //   datas = this.state.allItems.filter(m =>
    //     m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    //   );
    // }
    // let title = "";
    // if (datas[0] == undefined) {
    //   title = "Not found";
    // } else {
    //   title = datas[0].room;
    // }
    // console.log(datas);
    // let datas = this.state.allItems;

    console.log(workorders);
    let allItems = workorders;
    // if (this.props.match.params.i === "saved") {
    //   allItems = workorders.filter(m => m.status == this.props.match.params.i);
    // } else {
    //   allItems = workorders.filter(m => m.status == this.props.match.params.i);
    // }

    const region = JSON.parse(localStorage.getItem("currentUser")).region;
    // console.log(allItems);
    if (searchQuery) {
      allItems = allItems.filter(m =>
        m.adress.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // if(){

    // }
    // const workorder = JSON.parse(localStorage.getItem("workorder"));
    // const value = workorder.workorder.apartmentNumber;
    // const { adress } = this.state;
    // console.log(adress);
    let status = "";
    if (this.props.match.params.i == "pending") {
      status = false;
      console.log("radi");
    } else {
      status = true;
    }
    // console.log(this.props.match.params.i);
    return (
      <React.Fragment>
        <div className="container main-page">
          <NavBar
            {...this.props}
            build={this.state.build}
            // onHandleInput={this.handleInput}
            // build={build}
            onHandleChange={this.handleChange1}
            // onChangeBuildings={() => this.handleChangeBuilding()}
            onHandleAptNum={this.handleAptNum}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="rooms border text-center">
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3"
            >
              Logout
            </button>
            <h1 className="lead m-2">
              All {this.props.match.params.i} workorders
            </h1>
            <span
              onClick={e => this.firstInput.current.focus()}
              className="btn btn-secondary btn-sm mb-1"
            >
              Search by the Address:
            </span>
            <SearchBox
              firstInput={this.firstInput}
              value={searchQuery}
              onChange={this.handleSearch}
            />

            <table className="table">
              <thead>
                <tr>
                  <th className="item">Save/Send Date</th>
                  <th className="item">Building Number</th>
                  <th className="item">Apartment Number</th>
                  <th className="item">Address</th>

                  {status ? <th className="item">Link</th> : null}
                </tr>
              </thead>

              <tbody>
                {allItems.map(item => (
                  <tr key={item.name}>
                    {item.autosaveTime ? (
                      <td className="itemTd">
                        {new Date(item.autosaveTime).toLocaleString()}
                      </td>
                    ) : (
                      <td className="itemTd">
                        {new Date(item.completedTime).toLocaleString()}
                      </td>
                    )}
                    <td className="itemTd">{item.buildingNumber}</td>
                    <td className="itemTd">{item.apartmentNumber}</td>
                    <td className="itemTd">{item.adress}</td>
                    {/* {this.state.start && value ? (
                        <div className="row">{rooms}</div>
                      ) : null} */}
                    {status ? (
                      <td className="itemTd btn btn-warning">
                        <Link
                          to={{
                            pathname: `/rooms/${region}`,
                            state: {
                              buildingNumber: item.buildingNumber,
                              apartmentNumber: item.apartmentNumber,
                              jobs: item.jobs,
                              id: item._id,
                              level: item.level,
                              squareFeet: item.squareFeet
                            }
                          }}
                        >
                          Resume
                        </Link>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
            {message ? (
              <h4 className="p-4">
                {" "}
                You have no {this.props.match.params.i} workorders...
              </h4>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Workorders;
