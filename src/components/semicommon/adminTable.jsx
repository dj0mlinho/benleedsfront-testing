import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableName from "../common/tableName";
import Pagination from "../common/pagination";
import _ from "lodash";

const AdminTable = ({
  allOrders,
  status,
  onChange,
  onSort,
  sortColumn,
  checkEmpty,
  findUser,
  paginate,
  woPerPage,
  currentPage
}) => {
  //// filter orders by state prop
  if (allOrders.error || allOrders.length === 0) {
    return (
      <div className="container">
        <TableName tablename="No work orders in database" />
      </div>
    );
  }

  
    

  let filteredOrders = allOrders.filter(order => order.status === status);

  //// sorting work oreders /// returns a arrey
  let sorted = _.orderBy(filteredOrders, [sortColumn.path], [sortColumn.order]);

  //// pagination to show correct number of items/wo in table
  const indexOfLast = currentPage * woPerPage ;
  const indexOfFirst = indexOfLast - woPerPage ;
  let woPaginated = sorted.slice(indexOfFirst, indexOfLast)

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
    // if (status === "saved") return "pending";
  };

  

  return (
    <div className="container">
      
      {checkEmpty()}
      <table className="table table-hover table-responsive-sm">
        <thead>
          <tr className="font-resp-admin">
            {status === "saved" ? <th /> : <th className="line-hight-admin" scope="col">Select</th>}
            <th
              className="click-th"
              onClick={() => onSort("buildingNumber")}
              scope="col"
            >
              {arrowIcon("buildingNumber")}
              Building Number
            </th>
            <th
              className="click-th"
              onClick={() => onSort("apartmentNumber")}
              scope="col"
            >
              {arrowIcon("apartmentNumber")}
              Apartment Number
            </th>
            <th
              className="click-th line-hight-admin"
              onClick={() => onSort("firstName")}
              scope="col"
            >
              {arrowIcon("firstName")}
              User
            </th>
            <th
              className="click-th line-hight-admin"
              onClick={() => onSort("sendTime")}
              scope="col"
            >
              {arrowIcon("sendTime")}
              {status === "saved" ? "Save time" : "Send time"}
            </th>
            <th scope="col">
              <button onClick={onChange} className="btn btn-primary font-resp-admin">
                show {btnStatusText(status)}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td className="mt-3" colSpan="4">
                <p className="h6">There is 0 work orders whit this status </p>
              </td>
            </tr>
          ) : null}

          {woPaginated.map(order => (
            <tr className="font-resp-admin" key={order._id}>
              {status === "saved" ? (
                <td />
              ) : (
                <td>
                  
                  <Link
                    to={`/admin/workorder/${order._id}`}
                    className="mdc-button btn-sm btn font-resp-admin"
                  >
                    Select
                  </Link>
                </td>
              )}
               
              <td>{order.buildingNumber}</td>
              <td>{order.apartmentNumber}</td>
              <td> {findUser(order.user._id)}</td>
              <td>{new Date(order.sendTime).toLocaleString()}</td>
              <td>{order.status}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="6">
              <Pagination
                currentPage={currentPage}
                total={sorted.length}
                somethingPerPage={woPerPage}
                paginate={paginate}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
