import React, { Component } from "react";
import { getAllReports } from "../../services/reports";
import Spinner from "../../components/Ui/Spinner/Spinner";

import { toast } from "react-toastify";
import ReportsTableAdmin from "../../components/Reports/AllReportsAdmin/ReportsTableAdmin";
import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin"

export class FirstPage extends Component {
  state = {
    reports: null,
    load: false,
    adminStatus: "pending", 
    sortColumn: {path : "buildingCode" , order : "asc" }
  };

  async componentDidMount() {
    try {
      const response = await getAllReports();
      const reports = response.data.data;
        // // console.log("usao u try response.data" , response);
        let editedReportsArrey = [] 
        reports.forEach(report => {
          let newR = {...report, 
            unitNumber : report.unit, 
            name : report.user.name, 
          }
          editedReportsArrey.push(newR);
        }); 
        this.setState({
          reports: editedReportsArrey
          });  
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error + " Login again!")
       } else {
        toast.error(error.response.statusText + " Login again!")
       }  
    }
}

  //// show correct order status
  handleStatusChange = () => {
    
    if (this.state.adminStatus === "pending")
    return this.setState({ adminStatus: "sent" });
    if (this.state.adminStatus === "sent")
      return this.setState({ adminStatus: "pending" });
      // if (this.state.btnStatus === "saved")
      // return this.setState({ btnStatus: "pending" });
  };

   //// sorting the table
   handleSort = path => {
    if (this.state.sortColumn.path === path) {
      let order = this.state.sortColumn.order === "asc" ? "desc" : "asc";
      this.setState({ sortColumn: { path: path, order: order } });
    } else {
      this.setState({ sortColumn: { path: path, order: "asc" } });
    }
  };


  hanldeSelectReport = (id) => {
    this.props.history.push("/report/" + id)
  }

  render() {
    let firstP = null;
    if (!this.state.reports) {
      firstP = <Spinner />;
    }

    firstP = (
      <ReportsTableAdmin 
        load={this.props.load} 
        reports={this.state.reports} 
        status={this.state.adminStatus}
        onChangeStatus={this.handleStatusChange}
        onSelectReport={this.hanldeSelectReport}
        sortColumn={this.state.sortColumn}
        onSort={this.handleSort}
      />
    );

    return <PageNameAdmin pageName={this.props.pageName}>{firstP}</PageNameAdmin>;
  }
}

export default FirstPage;


