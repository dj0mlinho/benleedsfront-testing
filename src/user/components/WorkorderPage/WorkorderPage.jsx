import React, { Component } from "react";
import Button from "../../components/UI/ButtonCustom/Button";
import styles from "./WorkorderPage.module.css";
import logo from "../../img/ben-leeds-logo.png";
import axios from "axios";
import {
  roomsEndpoint,
  itemsEndpoint,
  jobsEndpoint,
  reportsEndpoint
} from "../../services/http";
class WorkorderPage extends Component {
  state = {};

  async componentDidMount() {
    const token = localStorage.getItem("token");

    const { data: resJobs } = await axios.get(
      jobsEndpoint + `?report=${this.props.match.params.id}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    const { data: resReport } = await axios.get(
      reportsEndpoint + "/" + this.props.match.params.id,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    console.log(resJobs);
    this.setState({ jobs: resJobs.data, reports: resReport.data });
  }

  render() {
    console.log(this.state.reports);
    const reports = this.state.reports;
    const jobs = this.state.jobs;
    return (
      <div className={styles.Profile}>
        <img src={logo}></img>

        {reports ? (
          <div className="row m-3 font-weight-bold">
            <div className="col-6 bold text-left pt-3">
              Name: {reports.user.name} <br />
              Email: {reports.user.email} <br />
              Region: {reports.user.region} <br />
            </div>
            <div className="col-6 text-right">
              Address: {reports.address} <br />
              Building Code: {reports.buildingCode} <br />
              Unit#: {reports.unit}
              <br />
              Square Footage: {reports.squareFootage} <br />
              Level: {reports.level} <br />
            </div>
          </div>
        ) : null}
        {jobs ? (
          <div>
            <table className={"table " + styles.Table}>
              <thead>
                <tr>
                  <th className="item">Room</th>
                  <th className="item">Item</th>
                  <th className="item">SubCategory</th>
                  <th className="item quantity">Quantity</th>

                  {/* <th className="item">Link</th> */}
                  <th className="item">Price</th>
                  <th className="item">Total $</th>
                </tr>
              </thead>
              {jobs.map(item => (
                <tbody key={item._id}>
                  <tr>
                    <td className="itemTd">
                      {item.room != undefined ? item.room : item.item.room}
                    </td>
                    <td className="itemTd">
                      {item.item.name ? item.item.name : item.name}
                    </td>
                    <td className="itemTd">{item.subcategory}</td>

                    <td className="itemTd">
                      {/* {!item.checked ? ( */}
                      {item.quantity}
                    </td>
                    <td className="itemTd">
                      ${item.price != null ? item.price : "0"}
                    </td>
                    <td className="itemTd">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.TextArea} colSpan="6">
                      <textarea
                        // cols="38"
                        // rows="2"
                        placeholder="Comment"
                        disabled={item.checked}
                        onPaste={this.handleChangeArea}
                        onChange={e => this.handleChangeArea(e, item._id)}
                        name={item.name}
                        value={item.comment}
                        id={item._id}
                        className="textarea-rooms form-control placeholder-input"
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div className={styles.Buttons}>
              <Button color="warning m-3">Cancel</Button>
              <Button color="primary m-3">Print</Button>
              <Button color="success m-3">Send</Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default WorkorderPage;
