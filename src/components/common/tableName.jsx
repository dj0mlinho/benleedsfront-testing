import React, { Component } from "react";
import Clock from "react-live-clock";

const TableName = props => {
  const tz = props.timeZone;

  return (
    

    <div className={`container ${props.customClass}`}>
      <div className="table-name clearfix">
        <span
          className={
            tz ? "p-display-inline float-left reset-bottom-margin admin-disp-none" : null
          }
        >
          {props.tablename === "Loading..." ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            props.tablename
          )}
        </span>
        {tz ? (
          <div className="float-right-clock">
            <span>
              <Clock
                format="dddd Do, MMMM, HH:mm:ss"
                ticking={true}
                interval={1000}
                timezone={tz}
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableName;
