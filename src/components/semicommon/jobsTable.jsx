import React from "react";
import Pagination from "../common/pagination";
import _ from "lodash";

export default function JobsTable(props) {
  const {
    jobs,
    jobStateSelect,
    searchQuery,
    searchOption,
    onFinish,
    paginate,
    currentPage,
    jobsPerPage
  } = props;

  let filteredJobsArrey = jobs.filter(job => job.status === jobStateSelect);
  let jobsSorted = _.orderBy(
    filteredJobsArrey,
    [job => job.subCategory.toLowerCase()],
    ["asc"]
  );

  console.log("test1", filteredJobsArrey);

  if (filteredJobsArrey.length === 0) {
    return (
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>There is no jobs whit that status at this moment</th>
          </tr>
        </thead>
      </table>
    );
  }

  //// search implement on arrey + paginate !!!!
  let searchedArrey = null;
  let jobsPaginated = null;
  if (searchQuery !== "") {
    searchedArrey = jobsSorted.filter(job =>
      job[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLast = currentPage * jobsPerPage;
    const indexOfFirst = indexOfLast - jobsPerPage;
    jobsPaginated = searchedArrey.slice(indexOfFirst, indexOfLast);
    // jobsSorted = searchedArrey ;
  } else {
    const indexOfLast = currentPage * jobsPerPage;
    const indexOfFirst = indexOfLast - jobsPerPage;
    jobsPaginated = jobsSorted.slice(indexOfFirst, indexOfLast);
  }

  const formatDate = assignmentDate => {
    // const formatedSelDate = month + "/" + day +"/" + year ;
    let d = new Date(assignmentDate).toLocaleString();
    return d;
  };

  return (
    <>
      <table className="table table-bordered table-hover table-responsive-sm">
        <thead>
          <tr className="font-resp-admin">
            <th className="line-hight-jobs">Comment</th>
            <th>Building Number</th>
            <th>Apartment Number</th>
            <th className="line-hight-jobs">Vendor</th>
            <th>Assignment Date</th>
          </tr>
        </thead>
        <tbody>
          {jobsPaginated.map(job => (
            <React.Fragment key={job._id}>
              <tr className="font-resp-admin" >
                <td>
                     <textarea
                        rows="2"
                        cols="40"
                        value={job.comment}
                        name="name"
                        type="text"
                        className="form-control form-control-sm"
                      /> 
                </td>
                <td>{job.workorder.buildingNumber}</td>
                <td>{job.workorder.apartmentNumber}</td>
                <td>
                  {job.vendor ? job.vendor.name : "not selected or deleted"}
                </td>
                <td>
                  {job.assignmentDate
                    ? formatDate(job.assignmentDate)
                    : "not assigned"}
                </td>
              </tr>
              <tr className={job.vendor ? "font-resp-admin" : "table-border-bottom font-resp-admin"}>
                <th colSpan="5">
                  Room:
                  <span className="font-weight-normal mr-5"> {job.room} </span>
                  Name:
                  <span className="font-weight-normal mr-5"> {job.name} </span>
                  Price: <span className="font-weight-normal" />
                  <span className="font-weight-normal mr-5"> {job.price} </span>
                  Quantity:
                  <span className="font-weight-normal mr-5">
                    {job.quantity}
                  </span>
                  
                </th>
              </tr>
              { (job.finishedDate ) ? (
                   <tr className= "table-border-bottom" >
                      <td colSpan="5">
                    <span className="font-weight-normal ">
                      <span className="font-weight-bold">Finished Date:</span>{" "}
                      <span className="endDate">{job.endDate}</span>
                    </span>
                    </td>
                    </tr>
                  ) : null}

              {job.vendor && job.endDate === "" ? (
                <tr className={job.vendor ? "table-border-bottom" : null}>
                  <th colSpan="3">Finish Job : </th>
                  <th colSpan="2">
                    <button
                      className="btn btn-sm mdc-button"
                      onClick={() => onFinish(job._id)}
                    >
                      Finish
                    </button>
                  </th>
                </tr>
              ) : null}
             </React.Fragment>
          ))}

          <tr>
            <td colSpan="6">
              <Pagination
                currentPage={currentPage}
                total={
                  searchQuery !== "" ? searchedArrey.length : jobsSorted.length
                }
                somethingPerPage={jobsPerPage}
                paginate={paginate}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="row">
        <div className="col">
          <Pagination
            currentPage={currentPage}
            total={
              searchQuery !== "" ? searchedArrey.length : jobsSorted.length
            }
            somethingPerPage={jobsPerPage}
            paginate={paginate}
          />
        </div>
      </div> */}
    </>
  );
}
