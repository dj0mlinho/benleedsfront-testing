import React from "react";
import DatePicker from "react-datepicker";

import styles from "./ReportVendors.module.css";
import Button from "../../Ui/Button/Button";
import ModalAdmin from "../../Ui/ModalAdmin/ModalAdmin"

export default function ReportVendors({
  vedorsByProffesion,
  onProffesionChange,
  onVendorChange,
  vendorsProfessions,
  inputDisable,
  onDateChange,
  addVendor,
  selectedVendor,
  startDate,
  endDate,
  onProffesionClick,
  reportVendors,
  onDateEdit,
  deleteVendor,
  onSubmitChanges, 
  enableSubmitButton,
  selectBlockShow, 
  onPrint,
  onFinished,
  reportId,
  reportStatusFinished
}) {
  const dinamicClassRender = selectedVendor => {
    return (
      styles.SelectBlockSecond_opa +
      " " +
      (selectedVendor ? styles.SelectBlockSecond_ani : null)
    );
  };
  
  const formatDate = (date) => {
    if (date) {
       return new Date(date) ;
     } else {
      return null ;
    }
  }
  
  const deleteIcon = (repotStatus, vendorId) => {
    if (repotStatus) {
       return null ;
    } else {
      return (<i onClick={() => deleteVendor(vendorId)} className={"fa fa-window-close" + " " + styles.deleteVendor}></i>)
    }
  }

  return (
    <div className={styles.VendorsBlock}>
      {reportVendors.length !== 0 ? <h4 className="mt-2">Selected Vendors</h4> : null }
      {console.log("selected vendor", selectedVendor)}
      {console.log("report vendors", reportVendors)}
      <div className={styles.reportVendors}>
        {reportVendors.map(vendor => (
          <div key={vendor._id} className={styles.reportVendors_wrap}>
            {deleteIcon(reportStatusFinished, vendor._id)}
            <div className={styles.reportVendors_div}>
              <div>
                <span>Company: </span>
                {vendor.company}
              </div>
              <div>
                <span>Name: </span>
                {vendor.contact ? vendor.contact : "-/-"}
              </div>
              <div>
                <span>Proffesion: </span>
                {vendor.function}
              </div>
              <div>
                <span>Phone Number: </span>
                {vendor.phoneNumber ? vendor.phoneNumber : "-/-"}
              </div>
            </div>
            <div className={styles.reportVendors_div2}>
              <div>
                <span>Email: </span>
                {vendor.email ? vendor.email : "-/-"}
              </div>
              <div>
                <span>Start Date:</span>
              </div>
              <div>
              <DatePicker
                 selected={formatDate(vendor.startDate)}
                 onChange={(date) => onDateEdit( date,  vendor._id, "start")}
                 placeholderText="Date isn't selected"
                 disabled={reportStatusFinished}
                />

              </div>
              <div>
                <span>End Date:</span>
              </div>
              <div>
              <DatePicker
                 selected={formatDate(vendor.endDate)}
                 onChange={(date) => onDateEdit( date,  vendor._id, "end")}
                 placeholderText="Date isn't selected"
                 disabled={reportStatusFinished}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={selectBlockShow ?  styles.SelectBlock : styles.SelectBlockHide}>
        <h4>Add New Vendor</h4>
      <div className={styles.SelectBlockFirst}>
        <div>
          <div>Proffesion: </div>
          <select
            onChange={onProffesionChange}
            className="form-control form-control-sm"
            onClick={() => onProffesionClick(selectedVendor)}
          >
            <option>Select</option>
            {vendorsProfessions.map(proffesion => (
              <option key={proffesion} value={proffesion}>
                {proffesion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>Vendor: </div>
          <select
            disabled={inputDisable.vendor}
            onChange={onVendorChange}
            className="form-control form-control-sm"
          >
            <option>Select</option>
            {vedorsByProffesion
              ? vedorsByProffesion.map(vendor => (
                  <option value={vendor._id} key={vendor._id}>
                    {vendor.company}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className={styles.TimeSelectDiv}>
          <div>Start Date: </div>
          <DatePicker
             selected={startDate}
             onChange={(date) => onDateChange( date,  "start")}
             placeholderText="Click to select a date"
             disabled={inputDisable.startTime}
           />
        </div>
        <div className={styles.TimeSelectDiv}>
          
          <div>End Date: </div>
          <DatePicker
             selected={endDate}
             onChange={(date) => onDateChange( date,  "end")}
             placeholderText="Click to select a date"
             disabled={inputDisable.startTime}
           />

        </div>
        <div>
          <Button
            clicked={addVendor}
            disabled={inputDisable.btn}
            btntype="button"
            btncolor="ButtonGrey"
          >
            ADD
          </Button>
        </div>
      </div>

      <div className={styles.SelectBlockSecond}>
        <div className={dinamicClassRender(selectedVendor)}>
          <span>Company:</span>
          <div>{selectedVendor ? selectedVendor[0].company : ""}</div>
        </div>
        <div className={dinamicClassRender(selectedVendor)}>
          <span>Name:</span>
          <div>{selectedVendor ? selectedVendor[0].contact : ""}</div>
        </div>
        <div className={dinamicClassRender(selectedVendor)}>
          <span>Phone Number:</span>
          <div>{selectedVendor ? selectedVendor[0].phoneNumber : ""}</div>
        </div>
        <div className={dinamicClassRender(selectedVendor)}>
          <span>Email:</span>
          <div> {selectedVendor ? selectedVendor[0].email : ""}</div>
        </div>
        <div className={dinamicClassRender(selectedVendor)}>
           <ModalAdmin selectedVendor={selectedVendor ? selectedVendor[0] : {}} customclass="float-right" btncolor="ButtonGrey" />
        </div>
      </div>
      <div className={styles.SelectBlockThird}>
      <div>
        <Button 
            clicked={onPrint}
            btntype="button"
            btncolor="ButtonYellow" >PRINT REPORT</Button>
      </div>
      <div>
        <Button 
            clicked={()=>onFinished(reportId)}
            btntype="button"
            btncolor="ButtonGreen">FINISH REPORT</Button>
      </div>
      <div className={styles.SubmitButton}>
         <Button 
            disabled={!enableSubmitButton}
            clicked={onSubmitChanges}
            btntype="button"
            btncolor="ButtonBlue" >SAVE CHANGES</Button>
      </div>
      

      </div>
      </div>
      
      
    </div>
  );
}

// Array(4)
// 0: {_id: "5db74cabc188d357846d1004", function: "Flooring", contact: "Oscar Alvarez", company: "A1 Floors", phoneNumber: "(323) 348-6027", …}
// 1: {_id: "5db74c35c188d357846d1003", function: "Flooring", contact: "Robert Regalado", company: "Robert Regalado", phoneNumber: "(818) 357-6725", …}
// 2:
// company: "Fidel Alonso"
// contact: "Giovanni Alonso"
// createdAt: "2019-10-28T19:52:07.718Z"
// email: "giovannialonso1230@gmail.com"
// function: "Blinds"
// phoneNumber: "(213) 272-1802"
// reports: [{…}]
// updatedAt: "2019-10-28T21:45:41.992Z"
// __v: 1
// _id: "5db746e793db4e53c0a4f0ef"
// __proto__: Object
// 3: {_id: "5db4e3e57f48fb3f881a1107", function: "Blinds", contact: "Arturo Gonzalez Vivanco", company: "Arturo Gonzalez Vivanco", phoneNumber: "661-312-9219", …}
// length: 4
// __proto__: Array(0)
