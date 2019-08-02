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

  // handleBackButton = () => {
  //   this.props.history.push("/rooms/" + this.props.match.params.m);
  // };
  // // async componentDidMount() {}
  // // getCurrentRoom = () => {
  // //   return this.props.match.params.id;
  // // };
  // handleBackButton = () => {
  //   const region = JSON.parse(localStorage.getItem("currentUser")).region;
  //   this.props.history.push("/rooms/" + region);
  // };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.clear();
      document.location = "/";
    }
  }
  // handleFinishedButton = () => {
  //   // console.log(this.props.match);
  //   this.props.history.push(
  //     "/rooms/" + this.props.match.params.id + "/work-order"
  //   );
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   const date = new Date();
  //   work.workorder.completedTime = date;
  //   localStorage.setItem("workorder", JSON.stringify(work));
  // };

  // handleChangeArea = ({ currentTarget: input }) => {
  //   const value = this.state.value;

  //   value[input.name] = input.value;

  //   this.setState({ value });

  //   const rooms = this.state.allItems.find(room => room._id === input.id);

  //   rooms.comment = this.state.value[input.name];

  //   localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
  // };
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };
  // validate = () => {
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(this.state.data, this.state.schema, options);
  //   if (!error) return null;

  //   const errors = {};
  //   for (let item of error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // };

  // validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const schema = { [name]: this.state.schema[name] };
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? error.details[0].message : null;
  // };

  // handleChange = e => {
  //   const input = e.currentTarget;

  //   const errors = { ...this.state.errors };
  //   const schema = { ...this.state.schema };
  //   const errorMessage = this.validateProperty(input);
  //   if (errorMessage) errors[input.name] = errorMessage;
  //   else delete errors[input.name];
  //   const data = { ...this.state.data };

  //   data[input.name] = input.value;

  //   this.setState({ data, errors });

  //   const rooms = this.state.allItems.find(room => room._id === input.id);

  //   rooms.quantity = data[input.name];

  //   localStorage.setItem("allItems", JSON.stringify(this.state.allItems));

  //   // schema = {
  //   //   [input.name]: Joi.number().label("quantity")
  //   // };
  //   // this.setState({ schema });

  //   // const data = { ...this.state.data };
  //   // console.log(input.value);
  //   // console.log(e.target.value);
  //   // data[input.name] = input.value;
  //   // this.setState({ data });

  //   // this.setState({ value: e.target.value });
  // };
  // // changeBuild(value) {
  //   // console.log(value);
  // }
  // handleSearch = query => {
  //   this.setState({ searchQuery: query });
  //   // console.log(query);
  // };
  // handleInput = e => {
  //   const { showing } = this.state;
  //   const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
  //     .buildingNumber;

  //   const buildings = JSON.parse(localStorage.getItem("buildings")).find(
  //     m => m.number == buildNumber
  //   );

  //   // element.value = element.number + " (" + element.zip + ")";
  //   const adress = buildings.adress + " (" + buildings.zip + ")";
  //   // console.log(buildings);
  //   this.setState({ adress });
  // };
  // handleCheckboxChange = e => {
  //   const checked = { ...this.state.checked };

  //   const rooms = this.state.allItems.find(
  //     room => room._id === e.currentTarget.id
  //   );
  //   if (e.target.checked === false) {
  //     checked[e.currentTarget.name] = e.target.checked;
  //     rooms.checked = false;

  //     localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
  //   } else {
  //     checked[e.currentTarget.name] = e.target.checked;
  //     rooms.checked = true;
  //     localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
  //   }
  //   this.setState({ checked });
  // };

  // handleChange1(e) {
  //   const building1 = e.target.value;
  //   const build = building1.split(":");
  //   const building = build[0];
  //   // console.log(building);
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   work.workorder.buildingNumber = building;
  //   localStorage.setItem("workorder", JSON.stringify(work));
  // }
  // handleWorkOrder = async () => {
  //   // const workOrder = JSON.parse(localStorage.getItem("workorder"));

  //   const allItems = JSON.parse(localStorage.getItem("allItems"));
  //   const copyItems = [...allItems].filter(item => {
  //     return item.checked;
  //   });
  //   const finalItems = copyItems.map(item => {
  //     return {
  //       name: item.name,
  //       price: item.price,
  //       room: item.room,
  //       subCategory: item.subCategory,
  //       quantity: item.quantity,
  //       comment: item.comment
  //     };
  //   });
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   work.jobs = finalItems;
  //   work.workorder.status = "saved";
  //   work.workorder.sendTime = new Date();
  //   work.workorder.completedTime = new Date();
  //   localStorage.setItem("workorder", JSON.stringify(work));
  //   const finalData = JSON.parse(localStorage.getItem("workorder"));
  //   console.log(finalData);
  //   const data = await axios.post(
  //     process.env.REACT_APP_API_URL + "/user/newWorkorder",
  //     JSON.stringify(finalData)
  //   );
  //   console.log(data);
  // };

  constructor(props) {
    super(props);
    this.firstInput = React.createRef();
    // const data = {};
    // const errors = {};
    // const value = {};
    // const checked = {};
    // const rooms = getRooms();
    // localStorage.setItem("workorder", JSON.stringify(work));

    // console.log(response.workorders);

    const allItems = JSON.parse(localStorage.getItem("workorders"));
    // console.log(allItems);
    // const room = this.props.match.params.m;

    // const renderedItems = allItems;
    // {
    //   renderedItems.map(item => (checked[item.name] = false));
    // }

    // let schema = this.state.schema;

    // let items = renderedItems;

    // {
    //   items.map(item => (schema[item.name] = Joi.number().label("quantity")));
    // }

    // const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
    //   m => m.region === this.props.match.params.m
    // );

    // const build = [...this.state.build];

    // // const d = buildings.map(
    //   element =>
    //     (element.value =
    //       element.number +
    //       ":" +
    //       " " +
    //       element.adress +
    //       " (" +
    //       element.zip +
    //       ")")
    // );

    // build.push(d);
    // this.state = { data };

    // const workorder = JSON.parse(localStorage.getItem("workorder"));
    // const build1 = [];
    // build1.push(workorder.workorder.buildingNumber);
    // build.push(build1);
    // const adress = [];
    // const searchQuery = "";
    // console.log(build);
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
                              id: item._id
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
