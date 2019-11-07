import React, { Component } from "react";
import styles from "./NewWorkorderForm.module.css";
import axios from "axios";

import {
  buildingsEndpoint,
  currentUserEndpoint,
  reportsEndpoint,
  getReport,
  updateQuestion
} from "../../services/http";
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
    appliancesSelected: "",
    valueBuild:"",
    allQuestions: [
     "Floor",
     "Paint",
     "Appliances",
"Windows",
 "Blinds",
"Cleaning",
      "Re-glazed",
      "Pest Cont",
    ]
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    const { data: resUser } = await axios.get(currentUserEndpoint, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  

    console.log(resUser, "radi USer");
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


    if (this.props.match.params.id) {
      const { data: report } = await axios.get(
        reportsEndpoint + "/" + this.props.match.params.id,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      const reportRes = report.data;
      const squareFootage = report.data.squareFootage;
      const valueUnit = report.data.unit;
      const lockBoxCode = report.data.lockBoxCode;
      const level = report.data.level;
      const valueBuild = report.data.buildingCode;
      const address = report.data.address;
      var appliances = Object.keys(reportRes).map(function(key) {
        return [key, reportRes[key]];
      });

      const app = ["refrigerator", "stove", "A/C", "microwave", "dishwasher"];
      const newApp = appliances.filter(a =>
        app.find(m => m == a[0]) != undefined ? a : null
      );
      const k = newApp.map(n => n[1]);

      var appliances111 = Object.keys(newApp).map(function(key) {
        return [key, newApp[key]];
      });

    
      var rep = Object.keys(appliances111).map(function(key) {
        return [key, appliances111[key]];
      });
      const kurac = rep.map(m => m[1][1]);

      
      console.log(
        kurac,
        rep,
        appliances111,
        "aaaaaaaaaaaa",
        "picka ti materina"
      );
      this.setState({
        appliancesSelected1: kurac,
        squareFootage,
        valueUnit,
        level,
        lockBoxCode,
        valueBuild,
        address
      });
    } else {
    }

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

  handleChange = async e => {
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
    console.log(this.state.value, "radi");
    const valueBuild = e.target.value;

    this.setState({ address, units, valueBuild });
    // if(k===true){}
  };

  handleChangeSquareFt = async e => {
    console.log(e.target.value, "jbg");
    let squareFootage1 = "";
    if (this.state.units) {
      squareFootage1 = this.state.units.find(m =>
        m.number == e.target.value ? m.squareFootage : null
      );
    }
    console.log(squareFootage1, "square");
    this.setState({ valueUnit: e.target.value });
    console.log(e.target.value);
    const token = localStorage.getItem("token");
    const value = e.target.value;
    console.log(this.state.valueBuild, e.target.value);
    const { data: resReport } = await axios.get(
      reportsEndpoint +
        `?buildingCode=${this.state.valueBuild}&unit=${e.target.value}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    if (!resReport.data[0]) {
      const report = {
        buildingCode: parseInt(this.state.valueBuild),
        unit: value,
        address: this.state.address,
        squareFootage: squareFootage1.squareFootage
      };
     

      const { data: resReport1 } = await getReport(report);
      console.log(resReport1, "report");
      const reportsId = resReport1.data._id;
      console.log(reportsId);

      this.props.history.push(`/${reportsId}`);
    } else {
      const report = resReport.data[0];
      const squareFootage = report.squareFootage;
      const valueUnit = report.unit;
      const lockBoxCode = report.lockBoxCode;
      const level = report.level;
      const valueBuild = report.buildingCode;
      const address = report.address;

      this.setState({
        address,
        squareFootage,
        valueUnit,
        level,
        lockBoxCode,
        valueBuild
      });
      this.props.history.push(`/${report._id}`);
    }

    const { data: report } = await axios.get(
      reportsEndpoint + "/" + this.props.match.params.id,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    const reportRes = report.data;
    var appliances = Object.keys(reportRes).map(function(key) {
      return [key, reportRes[key]];
    });

    const app = ["refrigerator", "stove", "A/C", "microwave", "dishwasher"];
    const newApp = appliances.filter(a =>
      app.find(m => m == a[0]) != undefined ? a : null
    );
    const k = newApp.map(n => n[1]);

    // var report1 = Object.keys(newApp[1]).map(function(key) {
    //   return [key, newApp[1][key]];
    // });
    var appliances111 = Object.keys(newApp).map(function(key) {
      return [key, newApp[key]];
    });

    // const chosenQuestion = appliances111.find(
    //   d => d[1][0] == name.toLowerCase()
    // );
    var rep = Object.keys(appliances111).map(function(key) {
      return [key, appliances111[key]];
    });
    const kurac = rep.map(m => m[1][1]);

    this.setState({
      appliancesSelected1: kurac,
      squareFootage: squareFootage1.squareFootage
    });
    // if (resReport.success) {
  };
  handleChangeLevel(e) {
    console.log(this);
    this.setState({ level: e.target.value });
  }
  handleLockBoxCode = e => {
    console.log(e.target.value);
    this.setState({ lockBoxCode: e.target.value });
  };

  handleQuestions = async name => {
    const token = localStorage.getItem("token");
    console.log(this.props.match.params.id, "this");
    const id = this.props.match.params.id;

    const reportInfo = {
      lockBoxCode: this.state.lockBoxCode,
      level: this.state.level
    };

    console.log(reportInfo);
    const { data: resReport } = await updateQuestion(reportInfo, id);
    console.log(resReport, "question");
    console.log(name, "name");
    const data = resReport.data;
    // const chosenQuestion=data.map(d=>)
    var report = Object.keys(data).map(function(key) {
      return [key, data[key]];
    });
    let chosenQuestion = report.find(r =>
      r[0] == name.toLowerCase() ? r[1] : null
    );
    console.log(chosenQuestion, "glupa su pitanja");

    //   return [questions[key].property]
    console.log(resReport, "report jedan");
    let chosenQuestion1 = [];
    if (chosenQuestion == undefined) {
      chosenQuestion1 = [
        "Refrigerator",
        "Microwave",
        "Dishwasher",
        "Stove",
        "A/C"
      ];
      const appliancesSelected = this.state.appliancesSelected;

      this.setState({
        chosenQuestion1,
        appliancesSelected
      });
    } else {
      chosenQuestion = chosenQuestion[1];
    }
  

    this.setState({ setShow: true, name, chosenQuestion });
  };

  // handleToDoModal = () => {
  //   console.log("radi");
  //   const setShow = this.state.setShow;

  //   this.setState({ setShow: true });
  // };
  handleClose = async () => {
    const setShow = this.state.setShow;

    const chosenQuestion = this.state.chosenQuestion;
    const name = this.state.name;
    const question = { [name.toLowerCase()]: chosenQuestion };

    console.log(question, "CLOSE");
    const id = this.props.match.params.id;
    const { data: resReport } = await updateQuestion(question, id);
    const zaMlinja = { ...this.state.zaMlinja };
    console.log(zaMlinja, "zzzzz");
   
    if (zaMlinja[0]) {
      const za = zaMlinja[0][0]
      const z = { [za]: zaMlinja[0][1] };
      console.log("zz", zaMlinja, z);

      const { data: resReport } = await updateQuestion(z, id);
      console.log(resReport,"zzzzzzzzz");

    }



    this.setState({ setShow: false });
  };

  handleOption = e => {
    const chosenQuestion = this.state.chosenQuestion;
    // questions.toArray();

    // const value = e.target.value;
    chosenQuestion.answer = e.target.value;
    console.log("eeeeeee", e.currentTarget);
    this.setState({ value: true, chosenQuestion });
  };
  handleComment = e => {
    const chosenQuestion = this.state.chosenQuestion;
    chosenQuestion.comment = e.target.value;
    this.setState({ chosenQuestion });
  };

  handleChangeSquare = square => {
    console.log("rrrrrrrrrrr");
    console.log(square, "square");
  };
  handleMakeReady = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/${id}/rooms`);
  };
  handleAppliances = async name => {
    if (name == "A/C") {
     name=name
    }else{
      name=name.toLowerCase()
    }
    const id = this.props.match.params.id;
  
    const appliancesSelected1 = [...this.state.appliancesSelected1];
   
   
    let chosenQuestion = appliancesSelected1.find(
      d => d[0] == name
    );
   
    var report = Object.keys(chosenQuestion[1]).map(function(key) {
      return [key, chosenQuestion[1][key]];
    });
   
    const zaMlinja = { ...this.state.zaMlinja };
if(zaMlinja[0]){
  const za = zaMlinja[0][0]
  const z = {[za]:zaMlinja[0][1]};
  console.log("zz",zaMlinja,z);

  const { data: resReport } = await updateQuestion(z, id);
  console.log(resReport);

}
   

   
    this.setState({
      appliancesSelected: report,
      nameApp: name
    });
  };

  handleAppliancesOption = async (e, name) => {
   if (name=="A/C"){
name=name
   }else {
    name= name.toLowerCase()
   }
    // const chosenQuestion = { ...this.state.chosenQuestion };
    let appliancesSelected = [...this.state.appliancesSelected];
    let appliancesSelected1 = [...this.state.appliancesSelected1];
    const value = e.currentTarget.value;
    let question = appliancesSelected.find(m => m[0] == value);
    const categoryy = question[1].category;
    console.log(appliancesSelected, "app seelllleec pre");
    let size = question.filter(m => m == categoryy);
    const question1 = question[1];
    // // console.log(question1);
    const answer = !question[1].checked;

    question[1].checked = answer;

    let question2 = appliancesSelected.filter(m => m[1].category == categoryy);
    const kurac = question2.map(m =>
      m[0] == value ? (m[1].checked = answer) : (m[1].checked = !answer)
    );
    const kurac1 = appliancesSelected1.filter(m => m[0] == name);

    console.log(kurac1);
    const finalKurac = kurac1;
    const checked = { checked: answer };
    const appp = this.state.appliancesSelected1;
  

 
    this.setState({ appliancesSelected, zaMlinja: finalKurac });
  };
  render() {
    console.log(
      this.state.chosenQuestion,
      "sta je question",
      this.state.appliancesSelected,
      "stae app"
    );
   const nameApp = this.state.nameApp;
    const questions = { ...this.state.questions };
    let answer1 = "";

    const appliancesSelected = this.state.appliancesSelected;

    

    const chosenQuestion = this.state.chosenQuestion;
    let comment = "";
    if (chosenQuestion) {
      answer1 = chosenQuestion.answer;
      comment = chosenQuestion.comment;
      console.log(answer1);
    }
    // if(chosenQuestion1){
    //   answer = chosenQuestion1[nameApp];
    // }
    const quest = ["Yes", "No", "Other"];
    const region = this.state.region;
    const userInfo = this.state.userInfo;
    const managerInfo = this.state.managerInfo;
    const value = this.state.valueUnit;
    const units = this.state.units;

    let squareFootage = "";
    if (units) {
      squareFootage = units.map(m =>
        m.number == value ? m.squareFootage : null
      );
    }
    console.log(this.state, "state");

    return (
      <div className={styles.MainDiv}>
        {userInfo[0] ? (
          <div>
            <div>
              <img className="m-3" src={logo} alt="Logo"></img>

              <div className="row">
                <div className="col-12 m-3">
                  <button
                    type="text"
                    value={region}
                    className="btn btn-light m-1"
                 
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
                        valueProp={this.state.valueBuild}
                       
                        style={styles.Inputs}
                      />
                      <span
                        className="btn btn-secondary"
                     
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
                        onChange={e => this.handleChangeSquareFt(e)}
                      >
                        <option value="select">
                          {this.state.valueUnit
                            ? this.state.valueUnit
                            : "Select unit#"}
                        </option>
                        {this.state.units
                          ? this.state.units.map(unit => (
                              <option key={unit.number} value={unit.number}>
                                {unit.number}
                              </option>
                            ))
                          : null}


                      </select>
                      <span
                        className={styles.Inputs}

                      >
                        {this.state.squareFootage
                          ? this.state.squareFootage
                          : "Sq Ft"}
                      </span>
                    
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <select
                    id="lang"
                    onChange={this.handleChangeLevel.bind(this)}
                    // value={this.state.tech}
                  >
                    <option value="select">
                      {this.state.level ? this.state.level : "Level:"}
                    </option>
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
                      value={this.state.lockBoxCode}
                      // placeholder="(Auto-populate the address)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3" >
                {this.state.allQuestions.map(q => (
                  <div  className={styles.Buttons} key={q}>
                  <ButtonCustom
                  
                    click={() => this.handleQuestions(q)}
                    // key={question}
                    color="secondary m-1"
                  >
                    {q}
                  </ButtonCustom>
                  </div>
                ))}
                {/* {this.state.name == "Appliances"
                  ? chosenQuestion.map(q => ( */}
                <Modal
                  id="modal-styling"
                  show={this.state.setShow}
                  onHide={this.handleClose}
                >
                  <Modal.Header closeButton className="text-center ">
                    <div className="row col-12">
                      <div className="col-8 mx-auto">
                        <Modal.Title className="btn btn-outline-info">
                          {this.state.name}
                        </Modal.Title>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body id="modal-styling-body">
                    <div className="row">
                      {this.state.name == "Appliances" ? (
                        <div>
                          {this.state.chosenQuestion1.map(q => (
                            <div key={q} className={styles.Buttons}>
                            <ButtonCustom
                              click={() => this.handleAppliances(q)}
                              color="danger m-1"
                            >
                              {q}
                            </ButtonCustom>
                            </div>
                          ))}

                          {appliancesSelected
                            ? appliancesSelected.map(m => (
                                <div key={m[0]}>
                                  <input
                                    className="m-3"
                                    type="radio"
                                    name={m[1].category}
                                    value={m[0]}
                                    checked={m[1].checked}
                                    onChange={e =>
                                      this.handleAppliancesOption(e, nameApp)
                                    }
                                  />
                                  {m[0]}
                                </div>
                              ))
                            : null}
                        </div>
                      ) : (
                        quest.map(m => (
                          <div key={m} className="col-12 mx-auto">
                            <input
                              className="m-3"
                              type="radio"
                              name={this.state.name}
                              checked={answer1 == m ? answer1 == m : ""}
                              value={m}
                              onClick={e => this.handleOption(e)}
                            />
                            {m}
                          </div>
                        ))
                      )}
                      {this.state.name != "Appliances" ? (
                        <textarea
                          className="m-3"
                          onChange={e => this.handleComment(e)}
                          name=""
                          id=""
                          cols="50"
                          rows="5"
                          value={comment}
                        ></textarea>
                      ) : null}
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="float-right">
                    <Button variant="primary" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* ))
                  : null} */}
                <div className="col-12">
                  <ButtonCustom
                    color="success btn-lg m-3"
                    click={this.handleMakeReady}
                  >
                    {" "}
                    Make Ready
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default NewWorkorderForm;
// m[0] == name1.find(r => r == m[0]) && nameApp == "stove"
//   ? "name1"
//   : false || (m[0] == name1.find(r => r == m[0]) && nameApp == "microwave")
//   ? "name11"
//   : false || (m[0] == name1.find(r => r == m[0]) && nameApp == "dishwasher")
//   ? "name111"
//   : false || (m[0] == name1.find(r => r == m[0]) && nameApp == "refrigerator")
//   ? "name1111"
//   : false || (m[0] == name2.find(r => r == m[0]) && nameApp == "refrigerator")
//   ? "name2"
//   : false || (m[0] == name2.find(r => r == m[0]) && nameApp == "dishwasher")
//   ? "name22"
//   : false || m[0] == name3.find(r => r == m[0])
//   ? "name3"
//   : false || m[0] == name4.find(r => r == m[0])
//   ? "name4"
//   : false || m[0] == name5.find(r => r == m[0])
//   ? "name5"
//   : false || m[0] == name6.find(r => r == m[0])
//   ? "name6"
//   : false;
// let name1 = [];
// let name2 = [];
// let name3 = [];
// let name4 = [];
// let name5 = [];
// let name6 = [];
// const nameApp = this.state.nameApp;
// if (nameApp == "refrigerator") {
//   name2 = ["standard", "small"];
//   name1 = ["white", "stainless"];
// }
// if (this.state.nameApp == "microwave") {
//   name1 = ["white", "stainless"];
// }
// if (this.state.nameApp == "A/C") {
//   name6 = ["8000", "10000", "12000"];
//   name5 = ["rear vent", "standard", "A/C heater"];
// }
// if (this.state.nameApp == "dishwasher") {
//   name2 = ["standard", "small"];
//   name1 = ["white", "stainless"];
// }
// if (this.state.nameApp == "stove") {
//   name1 = ["white", "stainless"];
//   name3 = ["20", "24", "30"];
//   name4 = ["gas", "electric"];
// }