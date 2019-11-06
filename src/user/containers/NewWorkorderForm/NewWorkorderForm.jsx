import React, { Component } from "react";
import styles from "./NewWorkorderForm.module.css";
import axios from "axios";
import { buildingsEndpoint, currentUserEndpoint } from "../../services/http";
import logo from "../../img/ben-leeds-logo.png";
import ImageProfile from "../../components/UI/ImageProfile/ImageProfile";
import Input from "../../components/UI/Input/Input";
import ButtonCustom from "../../components/UI/ButtonCustom/Button";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
class NewWorkorderForm extends Component {
  state = {
    userInfo: [],
    levels: [1, 2, 3, 4, 5],
    questions: [
      "Floor",
      "Paint",
      "Appliances",
      "Windows",
      "Blinds",
      "Cleaning",
      "Re-glazed",
      "Pest Cont"
    ]
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    const { data: resUser } = await axios.get(currentUserEndpoint, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    localStorage.setItem("loginTime", new Date().getTime());
    const user = resUser.data;
    const { data: resBuildings } = await axios.get(
      buildingsEndpoint + "?region=" + user.region,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const buildings = resBuildings.data;
    const managerInfo = [
      buildings[0].manager.name,
      buildings[0].manager.email,
      buildings[0].manager.currentPhone
    ];

    const userInfo = [user.name, user.email];

    this.setState({
      region: user.region,
      userInfo,
      managerInfo,
      buildings
    });
  };
  handleChange = e => {
    console.log(e.target.value);

    const chosenObject = this.state.buildings.map(m =>
      m.code == e.target.value ? m : null
    );
    let address = "";
    let units = [];
    console.log(chosenObject);
    if (chosenObject[0]) {
      address = chosenObject[0].address;
      units = chosenObject[0].units;
    }
    console.log(this.state.value);
    this.setState({ address, units });
    // if(k===true){}
  };

  handleChangeSquareFt(e) {
    // console.log(e.target.value);
    this.setState({ value: e.target.value });
  }
  handleChangeLevel(e) {
    // console.log(e.target.value);
    this.setState({ level: e.target.value });
  }
  handleLockBoxCode = e => {
    console.log(e.target.value);
  };

  handleQuestions = () => {
    console.log("btn");
    const setShow = this.state.setShow;

    this.setState({ setShow: true });
  };

  // handleToDoModal = () => {
  //   console.log("radi");
  //   const setShow = this.state.setShow;

  //   this.setState({ setShow: true });
  // };
  handleClose = () => {
    const setShow = this.state.setShow;
    this.setState({ setShow: false });
  };
  render() {
    const region = this.state.region;
    const userInfo = this.state.userInfo;
    const managerInfo = this.state.managerInfo;
    const value = this.state.value;
    const units = this.state.units;
    let squareFootage = "";
    if (units) {
      squareFootage = units.map(m =>
        m.number == value ? m.squareFootage : null
      );
    }
    console.log(squareFootage == true, units);
    return (
      <div className={styles.MainDiv}>
        {userInfo[0] ? (
          <div>
            <img className="m-3" src={logo} alt="Logo"></img>

            <div className="row">
              <div className="col-12 m-3">
                <button
                  type="text"
                  value={region}
                  className="btn btn-light m-1"
                  //   placeholder="(Auto-populate the address)"
                  // style={styles.InputAddress}
                >
                  {region}
                </button>
              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-8 input-group ">
                    <div className="input-group-prepend">
                      <span>Building Code: </span>
                    </div>
                    <Input
                      type="text"
                      change={this.handleChange}
                      //   placeholder="(Auto-populate the address)"
                      style={styles.Inputs}
                    />
                    <span
                      className="btn btn-secondary"
                      // type="text"
                      // value={this.state.address}

                      // //   placeholder="(Auto-populate the address)"
                      className={styles.InputAddress}
                    >
                      {this.state.address ? this.state.address : "Address"}
                    </span>
                  </div>

                  <div className="col-4 input-group ">
                    {/* <div className="input-group-prepend">
                      <span>Unit# </span>
                    </div> */}
                    <select
                      id="lang"
                      onChange={this.handleChangeSquareFt.bind(this)}
                    >
                      <option value="select">Select unit#</option>
                      {this.state.units
                        ? this.state.units.map(unit => (
                            <option key={unit.number} value={unit.number}>
                              {unit.number}
                            </option>
                          ))
                        : null}

                      {/* <option value="Bootstrap">Bootstrap</option>
                      <option value="React">React</option> */}
                    </select>
                    <span className={styles.Inputs}>
                      {squareFootage ? squareFootage : "Sq Ft"}
                    </span>
                    {/* <Input type="text" style={styles.Inputs} /> */}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <select
                  id="lang"
                  onChange={this.handleChangeLevel.bind(this)}
                  // value={this.state.tech}
                >
                  <option value="select">Level:</option>
                  {this.state.levels
                    ? this.state.levels.map(level => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))
                    : null}

                  {/* <option value="Bootstrap">Bootstrap</option>
                      <option value="React">React</option> */}
                </select>
                {/* <div className="input-group ">
                  <div className="input-group-prepend">
                    <span>Level: </span>
                  </div>
                  <Input type="text" style={styles.Inputs} />
                </div>
              </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col-12 m-3 p-3">
                <div className="input-group m-3">
                  <div className="input-group-prepend">
                    <span className="p-2">Regional:</span>
                  </div>
                  {userInfo.map(user => (
                    <div key={user}>
                      <button
                        type="text"
                        className="btn btn-light m-1"
                        // style={styles.InputAddress}
                        value={user}
                        placeholder="(Auto-populate the address)"
                      >
                        {user}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="input-group m-3">
                  <div className="input-group-prepend">
                    <span className="p-2">Manager:</span>
                  </div>
                  {managerInfo.map(manager => (
                    <div key={manager}>
                      <button
                        type="text"
                        className="btn btn-light m-1"
                        value={manager}
                        // style={styles.InputAddress}
                        placeholder="(Auto-populate the address)"
                      >
                        {manager}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="float-right">
                  <span className="">Lock box Code:</span>
                  <Input
                    type="text"
                    change={this.handleLockBoxCode}
                    style={styles.InputAddress}
                    // placeholder="(Auto-populate the address)"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="col-12">
          <span className="">Questions:</span>
          {this.state.questions.map(question => (
            <ButtonCustom
              click={this.handleQuestions}
              key={question}
              color="primary m-1"
            >
              {question}
            </ButtonCustom>
          ))}
        </div>
        <Modal
          id="modal-styling"
          show={this.state.setShow}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton className="text-center ">
            <div className="row col-12">
              <div className="col-8 mx-auto">
                <Modal.Title className="btn btn-outline-info">
                  To Do
                </Modal.Title>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body id="modal-styling-body">
            <div className="row">
              <div className="col-12 mx-auto">
                <Button>Questions</Button>
                {/* <textarea
                  onChange={this.handleChangeArea}
                  value={this.state.valueArea}
                  className="textarea-nav"
                  name=""
                  id=""
                  cols="40"
                  rows="2"
                ></textarea> */}
                {/* <input type="text" /> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="float-right">
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewWorkorderForm;
