import React from "react";

import styles from "./ReportJobs.module.css";

export default function ReportJobs({ roomsWhitJobs }) {
  const renderTable = room => {
    return (
      <table className="table table-sm text-left table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Job Name</th>
            <th scope="col">Comment</th>
            <th scope="col">Subcategory</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {room.jobs.map(job => {
            return (
              <tr key={job.item._id}>
                <td>{job.name}</td>
                <td>{job.comment}</td>
                <td>{job.subcategory}</td>
                <td>{job.quantity}</td>
                <td>{job.price}</td>
                <td> {job.totalPrice} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const calculateRoomPrice = jobs => {
    /// reduce method for suming all room job prices
    var initialValue = 0;
    var sum = jobs.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue.totalPrice;
    }, initialValue);
    return sum;
  };
   
  let num = 0;

  return (
    <div className={styles.JobsDiv}>
      {console.log("report jobs jobs", roomsWhitJobs)}
      <h4>Room List</h4>
      {roomsWhitJobs.map(room => {
        return (
          <div key={room.name}>
            <div className={styles.JobsHead}>
              <div className={styles.JobsHead_name}>
                <span>{(num += 1) + "."}{room.name}</span>
                <span>
                  Room Total Price: &#36; {calculateRoomPrice(room.jobs)}
                </span>
              </div>
              {room.comment ? (
                <div>
                  <span>Room Comment: </span>
                  {room.comment}
                </div>
              ) : null}
            </div>
            {room.jobs.length !== 0 ? renderTable(room) : null}
          </div>
        );
      })}
    </div>
  );
}
