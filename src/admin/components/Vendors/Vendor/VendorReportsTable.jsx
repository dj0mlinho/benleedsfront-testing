import React from "react";

import styles from "./VendorReportsTable.module.css";

import _ from "lodash";

export default function VendorReportsTable({ reports, onClickReport }) {
  const reportsFiltered = reports.filter(report => report.adminStatus === "sent") ;
  if (reportsFiltered.length === 0) {
    return  null;
  }

  const sortedReports = _.orderBy(reportsFiltered, "startDate" ) ;



  return (
    <div className={styles.VRTdiv}>
      <h4>Selected Vendor Schedule</h4>
      <table
        className={"table table-hover table-responsive-sm " + styles.Table}
      >
        
        <thead className="thead-light">
          <tr className="">
            <th className="" scope="col">
              Address
            </th>
            <th className="" scope="col">
              Building Code
            </th>
            <th className="" scope="col">
              Unit
            </th>
            <th className="" scope="col">
              Job Start Date
            </th>
            <th className="" scope="col">
              Job End Date
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.map(report => (
            <tr
              onClick={() => onClickReport(report.reportId)}
              className={styles.ReportClick}
              key={report.reportId}
            >
              <td>{report.address}</td>
              <td>{report.buildingCode}</td>
              <td>{report.unit}</td>
              <td>{report.startDate ? new Date(report.startDate).toLocaleString() : "-/-"}</td>
              <td>{report.endDate ?  new Date(report.endDate).toLocaleString() : "-/-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// [{…}, {…}]
// 0:
// address: "Green aveny"
// adminStatus: "pending"
// buildingCode: 3
// endDate: null
// report: {floor: {…}, paint: {…}, windows: {…}, blinds: {…}, cleaning: {…}, …}
// reportId: "5db74ff3c188d357846d1009"
// startDate: "2019-11-19T23:00:00.000Z"
// unit: "14-02"
// _id: "5dbddaf14c9e01121c0c0335"
// __proto__: Object
// 1: {startDate: null, endDate: "2019-11-18T23:00:00.000Z", _id: "5dc050aeea7686174497235e", report: {…}, reportId: "5dbf26710133c00580719c52", …}
// length: 2
// __proto__: Array(0)
