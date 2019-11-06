import React from 'react'

import styles from "./ReportsTableAdmin.module.css"
import Spinner from '../../Ui/Spinner/Spinner'
import _ from "lodash";

export default function ReportsTableAdmin({reports, load, status, onChangeStatus, onSelectReport , onSort, sortColumn }) {
  
  if (!reports) {
      return(
      <div>
        <Spinner />
      </div>
    )
  }

  let filteredReports = reports.filter(report => report.adminStatus === status) ;

  //// sorting reports , arrey whit obj ! /// returns a arrey
  let sorted = _.orderBy(filteredReports, [sortColumn.path], [sortColumn.order]);

  
  ///// pagination here


  //// changing asc/desc arrow depending on the user interaction
  let arrowIcon = path => {
    if (sortColumn.path === path) {
      return sortColumn.order === "asc" ? (
        <i className="fa fa-sort-desc mr-2" />
      ) : (
        <i className="fa fa-sort-asc mr-2" />
      );
    }
  };


  const btnStatusText = status => {
    if (status === "pending") return "sent";
    if (status === "sent") return "pending";
    
  };
  
  

  return (
    <table className="table table-hover table-responsive-sm">
        <thead>
          <tr className="">
             
            <th
              className=""
              onClick={() => onSort("buildingCode")}
              scope="col"
            >
              {arrowIcon("buildingCode")}
              Building Code
            </th>
            <th
              className=""
              onClick={() => onSort("unitNumber")}
              scope="col"
            >
              {arrowIcon("unitNumber")}
              Unit Number
            </th>
            <th
              className=""
              onClick={() => onSort("name")}
              scope="col"
            >
              {arrowIcon("name")}
              User
            </th>
            <th
              className=""
              onClick={() => onSort("sentTime")}
              scope="col"
            >
              {arrowIcon("sentTime")}
              {/* {status === "saved" ? "Save time" : "Send time"} */}
              Sent time
            </th>
            <th scope="col">
              <button onClick={onChangeStatus}  className="btn btn-primary">
                Show {btnStatusText(status)}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          
          {sorted.length === 0 ? (
            <tr>
              <td className="mt-3" colSpan="4">
                <p className="h6">There is 0 reports whit {status.toUpperCase()} status</p>
              </td>
            </tr>
          ) : null}

          {sorted.map(report => (
            <tr onClick={() => onSelectReport(report._id)} className={styles.ReportClick} key={report._id}>
              <td>{report.buildingCode}</td>
              <td>{report.unitNumber}</td>
              <td> {report.name}</td>
              <td>{new Date(report.sentTime).toLocaleString()}</td>
              <td>{report.adminStatus}</td>
            </tr>
          ))}

          {/* <tr>
            <td colSpan="6">
              <Pagination
                currentPage={currentPage}
                total={sorted.length}
                somethingPerPage={woPerPage}
                paginate={paginate}
              />
            </td>
          </tr> */}
        </tbody>
      </table>
  )
}





// adminStatus: "pending"
// appliances: {stove: Array(0), microwave: Array(0), refrigirator: Array(0), dishwasher: Array(0), a/c: Array(0)}
// comment: "checked everything"
// completedTime: "2019-10-14T15:31:27.041Z"
// createdAt: "2019-10-14T15:31:27.050Z"
// jobs: []
// level: 2
// sentTime: "2019-10-14T15:31:27.041Z"
// startedTime: "2019-10-14T15:31:27.041Z"
// unit: {manager: {…}, reportCreated: false, _id: "5da48ace17d9e438cc3556c9", unitNumber: "14-02", buildingCode: 3, …}
// updatedAt: "2019-10-14T15:31:27.050Z"
// user: {reports: Array(0), type: "user", status: "Active", _id: "5d8217f22139101a1eb877ed", name: "Nicole", …}
// userStatus: "todo"
// vendor: []
// __v: 0
// _id: "5da494cfc4fcf22b0cc01ade"