import React from "react";

import styles from "./ReportGeneral.module.css";

export default function ReportGeneral({ report, formatDate }) {
  return (
    <React.Fragment>
      <div className={styles.GeneralInfo}>
        <h4>General Report Info</h4>
        <div className={styles.DivBlock}>
          <span>
            <span>Report by:</span> {report.user.name}
          </span>
          <span className={styles.LargeWidth}>
            <span>Email:</span> {report.user.email}
          </span>
          <span>
            <span>Level:</span> {report.level}
          </span>
          <span>
            <span>Sq.Foot:</span> {report.squareFootage}
          </span>
          <span>
            <span>Lock Box Code:</span>
            {report.lockBoxCode}
          </span>
        </div>
        <div className={styles.DivBlock}>
          <span>
            <span>Building Code:</span>
            {report.buildingCode}
          </span>
          <span className={styles.LargeWidth}>
            <span>Building Address:</span>
            {report.address}
          </span>
          <span>
            <span>Unit:</span>
            {report.unit}
          </span>
          <span>
            <span>Region:</span>
            {report.region}
          </span>
          <span>
            <span>Total price:</span>
            {report.totalPrice}
          </span>
        </div>
      </div>
      <div className={styles.DateAndComment}>
        <div className={styles.DateAndComment_date}>
          <h6>Report times:</h6>
          <span>Start time: {formatDate(report.startedTime)}</span>
          <span>Completed time: {formatDate(report.completedTime)}</span>
          <span>Sent time: {formatDate(report.sentTime)}</span>
        </div>
        <div className={styles.DateAndComment_comment}>
          <div className={styles.DateAndComment_comment__first}>
            <h6>Comment: </h6>
          </div>
          <div className={styles.DateAndComment_comment__last}>
            <p>
              {report.reportComment === ""
                ? "User didn't left any comment"
                : report.reportComment}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
