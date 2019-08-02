import React, { Component } from "react";

import { getAllVendors } from "../services/vendor";
import { getJobs, getAllWorkorders } from "../services/jobs";
import { toast, ToastContainer } from "react-toastify";
import {endJob} from "../services/workOrders" ;

import AdminNavbar from "./common/adminNavbar";
import TableName from "./common/tableName";
import JobsTable from "./semicommon/jobsTable";
import SearchBox from "./common/search";


export default class Jobs extends Component {
  state = {
    vendors : null ,
    jobs: null,
    currentPage : 1,
    jobsPerPage : 16,
    searchQuery : "" ,
    searchOption : "name",
    options : [ "name" , "room" ] ,
    jobStateSelect: null,
    workorders : null,
    load: false
  };

  async componentDidMount() {
    const { data: jobs } = await getJobs();
    const { data: vendors } = await getAllVendors();
    const { data : workorders } = await getAllWorkorders();
    this.setState({
      jobs: jobs,
      vendors : vendors,
      workorders : workorders,
      load: true,
      
    }, () => this.populateJobsArrey());
  }

  handleJobStateSelect = (e) => {
     const select =  e.target.value.toLowerCase() ;
     this.setState({
       jobStateSelect : select 
     });
  }
  
  populateJobsArrey = () => {
   

    const jobs = this.state.jobs ;
    const vendors = this.state.vendors;
    const workorders = this.state.workorders;
    jobs.map(job => job.vendor = vendors.find(vendor=> job.vendorId === vendor._id) ); 
    jobs.map(job => job.workorder = workorders.find(wo=> job.workorderId === wo._id) );
    

    this.setState({
      jobs : jobs
    })
  }


  handleSearch = (query) => {
    this.setState({
      searchQuery : query 
    });
  }

  handleOptionsSearch = (e) => {
    this.setState({
      searchOption : e.target.value
    })
  }

  handlePaginate = (number) => {
    this.setState({
      currentPage : number 
    })
  }

  handleFinish = async (id) => {
     console.log(id);
     const jobs = [...this.state.jobs] ;
     console.log("jobs arrery", jobs );
      
     let jobsWithoutDeleted = jobs.filter(job => job._id !== id) ;
    //  console.log(jobsWithoutDeleted);
     
     const response = await endJob(id) ;      

     if (response.data.success) {
       toast.success("Job finished!"); 
       this.setState({
        jobs : jobsWithoutDeleted
      })
     } else {
       toast.error("Error in database")
      this.setState({
        jobs : jobs
     });
     
      }
  }  
  
  print = () => {
    window.print();
  }

  render() {
    if (this.state.load === false) {
      return (
        <>
          <AdminNavbar pageName="Jobs" />
          <TableName tablename="Loading..." />
          <ToastContainer />
        </>
      );
    }

   return (
      <> 
        
        <ToastContainer />
        <AdminNavbar pageName="Jobs" />
        <div className="row">
           <div className="offset-9 col-sm-3">
         <button onClick={this.print} className="btn btn-sm mdc-button print-btn"> Print Page </button> 
        </div>
        </div>
        <div>
          <SearchBox 
            resetPadding={true}
            options ={this.state.options}
            onOptionChange ={this.handleOptionsSearch}
            value = {this.state.searchQuery}
            onChange ={this.handleSearch}
          />
        </div>
        <div className="container container-bg">
          <form>
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label">Show jobs </label>
              <div className="col-sm-10 padding-jobs">
                <select onChange={this.handleJobStateSelect} className="form-control form-control-sm">
                   <option>By Jobs Status</option>
                  <option value="pending">Pending</option>
                  <option value="sent">Sent</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
            </div>
          </form>
          {(this.state.jobStateSelect === "By Jobs Status" || this.state.jobStateSelect === null ) ? null : 
          <JobsTable 
             jobsPerPage={this.state.jobsPerPage}
             currentPage={this.state.currentPage}
             paginate={this.handlePaginate}
             searchOption={this.state.searchOption}
             searchQuery = {this.state.searchQuery}
             jobStateSelect={this.state.jobStateSelect}
             jobs={this.state.jobs}
             vendors ={this.state.vendors}
             onFinish ={this.handleFinish}
          /> }
           
          

        </div>
        
      </>
    );
  }
}
