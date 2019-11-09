import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styles from "./ProfilePage.module.css";
import logo from "../../img/ben-leeds-logo.png";
import { currentUserEndpoint, reportsEndpoint } from "../../services/http";
import Button from "../../components/Buttons/Buttons.jsx";
import SpinnerCustom from "../../components/UI/Spinner/Spinner";
import ImageProfile from "../../components/UI/ImageProfile/ImageProfile";
import ReportsPage from "../../components/ReportsPage/ReportsPage";
import SearchBox from "../../components/UI/SearchBox/SearchBox";
class ProfilePage extends Component {
  state = {
    spinner: true,
    buttons: ["New", "To Do Units", "Pending Reports", "Sent Reports"]
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    const { data: data } = await axios.get(currentUserEndpoint, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    localStorage.setItem("loginTime", new Date().getTime());
    console.log("jebenidata", data);
    const id = data.data._id;
    const { data: resReports } = await axios.get(
      reportsEndpoint + `?user=${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    const allReports = resReports.data;
    console.log(allReports);
    // const sent = allReports.filter(report => report.adminStatus == "sent")
    //   .length;
    // console.log(sent);
    const pending = allReports.filter(report => report.adminStatus == "pending")
      .length;
    const toDo = allReports.filter(report => report.adminStatus == "sent");
    this.setState({ data: data.data, allReports, pending, spinner: false });
  };
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  // handleSignOut() {
  //   console.log("clear");
  //   localStorage.clear();
  // }
  // scrollToBottom = () => {
  //   this.el.scrollIntoView({ behavior: "smooth" });
  // };

  handleReports = id => {
    this.props.history.push(`/${id}`);
    console.log("radi");
  };
  handleReportOptions = button => {
    // this.scrollBottom.scrollIntoView({ behavior: "smooth" });
    const data = this.state.data;
    const id = data._id;
    const allReports = [...this.state.allReports];
    let reports = [];
    if (button == "New") {
      this.props.history.push("/new");
    }
    if (button == "Sent Reports") {
      button = "sent";

      reports = allReports.filter(report => report.adminStatus == "sent");

      this.props.history.push(`/${id}/reports/${button}`);
    }
    if (button == "Pending Reports") {
      button = "pending";

      reports = allReports.filter(report => report.adminStatus == "pending");

      this.props.history.push(`/${id}/reports/${button}`);
    }
    if (button == "To Do Units") {
      this.props.history.push("/new");
    }

    this.setState({ reports });
    this.handleClick();
    // this.scrollToBottom();
  };
  handleSignOut = () => {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.clear();
      document.location = "/";
    }
  };
  handleSearch = query => {
    console.log(query);
    this.setState({ searchQuery: query });
  };

  handleSearchFocus = () => {
    this.textInput.focus();
  };
  handleClick = () =>
    this.ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  render() {
    let reports = this.state.reports;
    const searchQuery = this.state.searchQuery;
    // console.log(data, "data");
    if (searchQuery && reports) {
      reports = this.state.reports.filter(m =>
        m.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    let data = this.state.data;
    console.log(this.state.reports);

    const buttons = this.state.buttons;
    // const click = r => {
    //   return <button onClick={this.handleapp}>radi</button>;
    // };
    return (
      <div className={styles.Profile}>
        <img className="m-3" src={logo} alt="Logo"></img>
        {this.state.spinner ? <SpinnerCustom></SpinnerCustom> : null}
        <div className="row">
          <div className="col-sm-4 offset-sm-4 mt-3">
            {data ? (
              <ImageProfile
                imageUrl={"uploads/" + data.photo}
                name={data.name}
                region={data.region}
              ></ImageProfile>
            ) : null}
          </div>
          <div className="col-sm-4 mt-3">
            <button className="btn btn-danger" onClick={this.handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            {buttons.map(button => (
              <Button
                number={button == "Pending Reports" ? this.state.pending : 0}
                key={button}
                click={() => this.handleReportOptions(button)}
                // onclick="selected(this)"
                style={styles.Buttons}
              >
                {button}
              </Button>
            ))}
          </div>
        </div>
        {/* <div
          ref={el => {
            this.el = el;
          }}
          style={{ float: "left", clear: "both" }}
        >
       
        </div> */}
        {/* <div
         
        ></div> */}
        <div ref={this.ref}>
          {reports ? (
            <div>
              <span
                onClick={e => this.firstInput.current.focus()}
                className="search-input btn btn-secondary btn-sm"
              >
                Search by Item's:
              </span>
              <SearchBox
                firstInput={this.firstInput}
                value={searchQuery}
                onChange={this.handleSearch}
              />
              <Route
                render={props => (
                  <ReportsPage
                    reports={reports}
                    click={id => this.handleReports(id)}
                    {...props}
                  />
                )}
                path="/:id/reports/:r"
              />
            </div>
          ) : null}
        </div>
        {/* <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        ></div> */}
      </div>
    );
  }
}

export default ProfilePage;
