import React, { Component } from "react";
import { getOneReport, sendVendorsToReport } from "../../services/reports";
import { getAllVendors } from "../../services/vendors" ;

import styles from "./Report.module.css";
import Spinner from "../../components/Ui/Spinner/Spinner";

import ReportGeneral from "../../components/Report/ReportGeneral/ReportGeneral";
import ReportQuestions from "../../components/Report/ReportQuestions/ReportQuestions";
import ReportJobs from "../../components/Report/ReportJobs/ReportJobs";
import ReportVendors from "../../components/Report/ReportVendors/ReportVendors"
import { toast } from "react-toastify";

export class Report extends Component {
  state = {
    startDate : "" ,
    endDate : "" ,
    report: null,
    load: false,
    roomsWhitJobs : null ,
    vedorsByProffesion : null ,
    allVendors : null ,
    reportVendors : null,
    allVendorsMinusSelected : null ,
    vendorsSelectedArrey : null ,
    vendorsProfessions : null ,
    selectedVendorId : null ,
    selectedVendor : null ,
    inputDisable : {
       vendor : true ,
       startTime : true ,
       endTime : true ,
       btn : true
    },
    initialQuestions: [],
    appliances: []
  };

  async componentDidMount() {

     try {
      const reportId = this.props.match.params.id ; 
      const { data } = await getOneReport(reportId);
      const report = data.data;
      const response = await getAllVendors();
      const allVendors = response.data.data ;
            
      ///// extracting only vendors that arent selected for this report
      const allVendorsMinusSelected = allVendors.filter(vendor => {
        return !report.vendors.some(ven => ven._id === vendor._id)
      })
     

      ///// putting  questions in arrey
      let propNames = [
        "blinds",
        "cleaning",
        "floor",
        "paint",
        "windows",
        "pest cont",
        "re-glazed"
      ];
      let initialQuestions = [];
      for (const key in report) {
        if (propNames.indexOf(key) > -1) {
          initialQuestions.push({ type: key, info: report[key] });
        }
      }
  
      ///// putting appliances in arrey
      let aplNames = ["A/C", "dishwasher", "microwave", "refrigerator", "stove"];
      let appliances = [];
      for (const key in report) {
        if (aplNames.indexOf(key) > -1) {
          appliances.push({ type: key, info: report[key] });
        }
      }
       
       
      ///// vendors modification
      const vendorsArrey = [] ;
      allVendorsMinusSelected.forEach(vendor => {
         vendorsArrey.push(vendor.function) 
      })
      const vendorsProfessions = [...new Set(vendorsArrey)] ;

      //// modifying arrey for easy render
      const jobs = report.jobs
      const modJobs = jobs.map(job => {
        return {...job, 
                 name : job.item.name ,
                 price : job.item.price ,
                 subcategory : job.item.subcategory,
                 room : job.item.room.slice(4)   
          }
      })
      const roomComments = report.roomComments ;
      const roomsWhitJobs = this.makeReportJobsArrey(modJobs, roomComments);

      //// making report vendors easy to work whit
      const reportVendors = report.vendors ;
      let modReportVendors = reportVendors.map(report => ({
         ...report ,
         startDate : report.reports.find(rep=> reportId === rep.report ).startDate ,
         endDate : report.reports.find(rep=> reportId === rep.report  ).endDate
      }))

      

      this.setState({
        load: true,
        report: report,
        reportVendors : modReportVendors,
        allVendorsMinusSelected : allVendorsMinusSelected ,
        allVendors : allVendors, 
        initialQuestions: initialQuestions,
        appliances: appliances, 
        roomsWhitJobs : roomsWhitJobs ,
        vendorsProfessions : vendorsProfessions
      });
     
     } catch (error) {
       if (error.response.data.error) {
        toast.error(error.response.data.error + " Login again!")
       } else {
        toast.error(error.response.statusText + " Login again!")
       }
       
     }

}
  
  makeReportJobsArrey = (jobs, roomComments) => {   
     const roomNames = [] ;
     roomComments.forEach(room => {
       if (room.roomName) {
         roomNames.push(room.roomName)
       } else return ;
     });
     jobs.forEach(job => {
      roomNames.push(job.room) 
     })
     
     /// remove duplicate entry and modify arrey
     const roomsMutated = [...new Set(roomNames)].map(room => {
         return { name : room , comment : "" , jobs : [] }
     })
     /// populate jobs arrey whit jobs from report
     let roomsWhitJobs = roomsMutated.map(room => {
       let jobsFiltered = jobs.filter(job => job.room === room.name )
       return {...room, jobs : jobsFiltered}
     })
     /// populate room comment from report roomComment prop
     let roomsWhitJobsAndComments = roomsWhitJobs.map(room => {
        let commentFiltered = roomComments.filter(comment => comment.roomName === room.name);
        return (commentFiltered.length === 0) ? room : {...room , comment : commentFiltered[0].comment } 
     })
     
     return roomsWhitJobsAndComments ;
  }

  handleCapitalizeFirst = string => {
    if (typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1) + ":";
  };

  handleFormatDate = date => {
    return new Date(date).toLocaleString();
  };

  handleAppliancesInfoToString = objInfo => {
    const stringArr = [];
    for (const key in objInfo) {
      if (objInfo[key]) {
        stringArr.push(key);
      }
    }

    if (stringArr.length === 0) {
      return "-/-";
    } else {
      return stringArr.join(" ");
    }
  };
 
  
  /////   VENDORS   /////
  hadnleProffesionChange = (e) => {
    if (e.target.value === "Select") {
      return ;
    }
    
    const selectedProff =  e.target.value;
    const stateCopy = {
      ...this.state , 
      inputDisable : {...this.state.inputDisable}                        
    } 
    const vedorsByProffesion = stateCopy.allVendorsMinusSelected.filter(vendor => vendor.function === selectedProff)
    stateCopy.inputDisable.vendor = false ;
    stateCopy.vedorsByProffesion = vedorsByProffesion ;

   this.setState(
       stateCopy
   )
  }

  handleVendorChange =(e) => {
    if (e.target.value === "Select") {
      return ;
    }
     
    const stateCopy = {...this.state, 
          inputDisable : {...this.state.inputDisable }     
    }
    // console.log("e target", e.target.value);
    const selectedVendorId = e.target.value ;
    const allVendorsMinusSelected = stateCopy.allVendorsMinusSelected; 
    const selectedVendor = allVendorsMinusSelected.filter(vendor => selectedVendorId === vendor._id)

    const inputDisable = stateCopy.inputDisable ;
    for (const name in inputDisable) {
      inputDisable[name]  = false ; 
    }
    
    this.setState({
      selectedVendorId : selectedVendorId,
      selectedVendor : selectedVendor,
      inputDisable : inputDisable
    })

  }

  handleDateChange = (e, type) => {
     if (type === "start") {
      const startDate = e.target.value ; 
      this.setState({
       startDate : startDate
      })
 
     } else {
      const endDate = e.target.value ; 
      this.setState({
       endDate : endDate
      })
     }
  } 

  handleAddVendor = () => {
    const stateCopy = {...this.state, 
      inputDisable : {...this.state.inputDisable }     
    }
    const reportVendors = stateCopy.reportVendors ;
    const selectedVendorId = stateCopy.selectedVendorId ;
    let allVendorsMinusSelected = stateCopy.allVendorsMinusSelected ;
    const vendorSel = allVendorsMinusSelected.find(vendor => selectedVendorId === vendor._id )
    allVendorsMinusSelected = allVendorsMinusSelected.filter(vendor => selectedVendorId !== vendor._id )
    const vendorToAdd = {...vendorSel, startDate : stateCopy.startDate, endDate : stateCopy.endDate }
    reportVendors.push(vendorToAdd)
    // console.log("vendor to add" , vendorToAdd)
    // console.log("22222" , stateCopy)
    
    const inputDisable = stateCopy.inputDisable ;
      for (const name in inputDisable) {
        inputDisable[name]  = true ; 
      }

   this.setState((state, props) => ({
       allVendorsMinusSelected : allVendorsMinusSelected,
       selectedVendor : null ,
       inputDisable : inputDisable, 
       reportVendors : reportVendors
   }))


  }
  
  
  /// reset selected vendor and deisable inputs
  hadnleProffesionClick = (vendor) => {
    const stateCopy = {...this.state, 
      inputDisable : {...this.state.inputDisable }     
    }

    if (vendor !== null) {
      const inputDisable = stateCopy.inputDisable ;
      for (const name in inputDisable) {
        inputDisable[name]  = true ; 
      }
      this.setState((state, props) => (
        {selectedVendor :  null, 
          inputDisable : inputDisable }
      ))
   }
  }


  render() {
    let report = null;

    let userReport = this.state.report;

    if (!this.state.load) {
      report = <Spinner />;
    } else {
      report = (
        <React.Fragment>
          {console.log("report", userReport)}
          <ReportGeneral
            formatDate={this.handleFormatDate}
            report={this.state.report}
          />
          <ReportQuestions
            initialQuestions={this.state.initialQuestions}
            appliances={this.state.appliances}
            appliancesInfoToString={this.handleAppliancesInfoToString}
            capitalizeFirst={this.handleCapitalizeFirst}
          />
          <ReportJobs 
            roomsWhitJobs={this.state.roomsWhitJobs}
          
          />
          <ReportVendors 
          onProffesionChange={this.hadnleProffesionChange}
          onVendorChange={this.handleVendorChange}
          onDateChange={this.handleDateChange}
          onProffesionClick={this.hadnleProffesionClick}
          addVendor={this.handleAddVendor}
          selectedVendor={this.state.selectedVendor}
          vedorsByProffesion={this.state.vedorsByProffesion}
          vendorsProfessions={this.state.vendorsProfessions}
          inputDisable={this.state.inputDisable}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          reportVendors={this.state.reportVendors}
          />
        </React.Fragment>
      );
    }

    return <React.Fragment>{report}</React.Fragment>;
  }
}

export default Report;







