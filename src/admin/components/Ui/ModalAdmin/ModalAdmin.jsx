import React, {useState} from 'react'

import styles from "./ModalAdmin.module.css"

import { Modal } from "react-bootstrap"
import Button from "../Button/Button" 

export default function ModalAdmin({customclass, btncolor, selectedVendor, goVendor}) {
   
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const lightSchedule = (reportsArrey) => {
   
     if (reportsArrey.length === 0) {
       return <p>There is no report assigned to this vendor</p>
     }
     
     ////display only reports that are still active
     let reportsArreyFiltered = reportsArrey.filter(rep => rep.reportStatus === "sent")

     let num = 1 ;
     let newArr =  reportsArreyFiltered.map(report =>  ( 
          <p key={report._id}><span>{num++ +"."}</span><span>Report </span>
          <span >Start date : </span> {report.startDate ? report.startDate.slice(0,10) + "  " : "-/-" } 
          <span>End date : </span> {report.endDate ? report.endDate.slice(0,10) : "-/-" } 
          </p>
       ))
     
     return newArr ;  
  }

  return (
    <>
    {console.log("modal vendor",selectedVendor)}
    <Button btncolor={btncolor} customclass={customclass} clicked={handleShow}>
       Schedule  
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header  closeButton>
        <Modal.Title>{selectedVendor.company}</Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
         <div className={styles.ModalBodyDiv}>
             {lightSchedule(selectedVendor._id ? selectedVendor.reports : [])}
         </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.BtnDiv} btncolor={btncolor}  onClick={()=>goVendor(selectedVendor._id, selectedVendor.function, selectedVendor.company)}>
         VENDOR PAGE
        </div>
        <Button btncolor={btncolor}  clicked={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}


// Object
// company: "Jesus Cortez"
// contact: "Jesus Cortez"
// createdAt: "2019-10-30T20:45:48.946Z"
// email: "jesus@benleedsproperties.com"
// function: "Maintenance"
// phoneNumber: "(213) 377-7179"
// phoneNumber2: ""
// reports: Array(1)
// 0: {startDate: null, endDate: "2019-11-19T23:00:00.000Z", _id: "5dbddaf14c9e01121c0c0334", report: "5db74ff3c188d357846d1009"}
// length: 1
// __proto__: Array(0)
// updatedAt: "2019-11-02T19:37:21.170Z"
// __v: 6
// _id: "5db9f67cdaec987fea3faab4"
// __proto__: Object