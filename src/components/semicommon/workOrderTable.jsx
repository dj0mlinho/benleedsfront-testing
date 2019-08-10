import React, { Component } from "react";
import WorkOrderJobs from "./workOrderJobs" ;
import SearchBox from "../common/search"

export default class workOrderTable extends Component {

  state = {
    searchQuery : "" ,
    searchOption : "name",
    options : [ "name" , "room" ] 
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

  formateDate = (date) => {
    let d = new Date(date).toLocaleString();
    return d;
  }


  render() {
    const { workorder, jobs } = this.props.workorder;
    const { users, onDateChange, onDateChangeTwo, onVendorChange , vendors, handleId, returnVendorId, onOk, okTriger , onProfessionChange, professions, vendorsWhitSamePro, allSentJoobs, allWorkOrders } = this.props;

    let workorderUser = users.find(x => x._id === workorder.userId);
    const userName =   workorderUser.name ;

    

    

    return (
      <div>
        
        <div className="container container-bg">
          <div className="row">
            <div className="col-sm-3">
              <span className="lead font-weight-bold">Work Order Of:</span>
            </div>
            <div className="col-sm-9 text-center">
              <h5 className="reset-mb">{userName}</h5>
            </div>
          </div>
          <div className="row border-b">
            <div className="col-sm-3">
              <span className="lead font-weight-bold">Time:</span>
            </div>
            <div className="col-sm-3 text-center">
             
                <span className="lead">login time :</span >
                <span style={{display: "block"}}> {this.formateDate(workorder.loginTime)}
              </span>
            </div>
            <div className="col-sm-3 text-center">
              <span className="lead">completed date:</span>
              <span style={{display: "block"}}> { this.formateDate(workorder.completedTime)} </span>
            </div>
            <div className="col-sm-3 text-center">
              <span className="lead">sent :</span>
              <span style={{display: "block"}} > {this.formateDate(workorder.sendTime)} </span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm text-center"> <pre className="lead font-weight-bold mt-2"> J O B S    L I S T</pre> 
            <SearchBox 
            // resetPadding={true}
            options ={this.state.options}
            onOptionChange ={this.handleOptionsSearch}
            value = {this.state.searchQuery}
            onChange ={this.handleSearch}
          />

             </div>
          </div>

          <WorkOrderJobs 
             allWorkOrders ={allWorkOrders}
             jobs={jobs}
             searchOption ={this.state.searchOption}
             searchQuery = {this.state.searchQuery}
             onVendorChange ={onVendorChange}
             onDateChange= {onDateChange} 
             onDateChangeTwo= {onDateChangeTwo} 
             vendors={vendors}
             handleId={handleId}
             returnVendorId={returnVendorId}
             onOk = {onOk}
             okTriger ={okTriger}
             onProfessionChange={onProfessionChange}
             professions={professions}
             vendorsWhitSamePro={vendorsWhitSamePro}
             allSentJoobs={allSentJoobs}
            
          />

        </div>
      </div>
    );
  }
}
