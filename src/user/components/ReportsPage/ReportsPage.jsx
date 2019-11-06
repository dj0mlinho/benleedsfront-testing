import React from "react";
import styles from "./ReportsPage.module.css";
import logo from "../../img/ben-leeds-logo.png";
// import axios from "axios";
// import { reportsEndpoint } from "../../services/http";

const ReportsPage = props => {
  return (
    <div className={styles.Profile}>
      <img src={logo}></img>
      <div className="m-3">
        <table className={"table " + styles.Table}>
          <thead>
            <tr>
              <th className="item">Starting/Send Date</th>
              <th className="item">Building Code</th>
              <th className="item">Unit#</th>
              <th className="item quantity">Address</th>

              {/* <th className="item">Link</th> */}
              <th className="item">Link</th>
              {/* <th className="item">Total $</th> */}
            </tr>
          </thead>
          {props.reports.map(report => (
            <tbody key={report._id}>
              <tr>
                <td className="itemTd">{report.date}</td>
                <td className="itemTd">{report.buildingCode}</td>
                <td className="itemTd">{report.unit}</td>

                <td className="itemTd">{report.address}</td>
                <td className="itemTd"></td>
                <td className="itemTd"></td>
              </tr>

              <tr>
                <td className={styles.TextArea} colSpan="6">
                  {/* <textarea
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
                  /> */}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
