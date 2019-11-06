import React from 'react'

import styles from "./VendorsTable.module.css" ; 

import Button from "../../../components/Ui/Button/Button"

export default function VendorsTable({vendorsByProffesion, onClickVendor, onBackClick}) {
  if (vendorsByProffesion.length === 0) {
     return null ;
  } 
  
  return (
    <table className={"table table-hover table-responsive-sm " + styles.Table}>
      {console.log("rrrr", vendorsByProffesion )}
      <thead className="thead-light">
        <tr className="">
          <th className="" scope="col">
            Company
          </th>
          <th className="" scope="col">
            Contact
          </th>
          <th className="" scope="col">
            Phone Number 1
          </th>
          <th className="" scope="col">
            Phone Number 2
          </th>
          <th className="" scope="col">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {vendorsByProffesion.map(vendor => (
          <tr
            onClick={() => onClickVendor(vendor.company, vendor._id)}
            className={styles.VendorClick}
            key={vendor._id}
            >
            <td>{vendor.company}</td>
            <td>{vendor.contact ? vendor.contact : "-/-" }</td>
            <td> {vendor.phoneNumber ? vendor.phoneNumber : "-/-"}</td>
            <td>{vendor.phoneNumber2 ? vendor.phoneNumber2 : "-/-"}</td>
            <td>{vendor.email ? vendor.email : "-/-"}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="2"><Button clicked={onBackClick} >Go Back</Button></td>
          <td className={styles.AddNewBtn}  colSpan="3"><Button clicked={() => onClickVendor("newVendor" ,"newVendor")}>Add New Vendor</Button></td>
        </tr>
      </tbody>
    </table>
  )
}
