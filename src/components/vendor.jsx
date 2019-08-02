import React, { Component } from 'react'
import {getVendor, saveVendor} from "../services/vendor"

import { toast, ToastContainer } from "react-toastify";

import AdminNavbar from "./common/adminNavbar";
import TableName from "./common/tableName";
import VendorForm from "../components/semicommon/vendorForm"

import Joi from "joi";


export class Vendor extends Component {
   state = {
     vendor : {
       _id : "",
       name : "" ,
       email : "" ,
       profession : "",
       calendar : [],
       phone : "" 
     },
     load : false,
     errors : {}
   }

    //// schema for input check but only on submit form btn click
  schema = Joi.object().keys({ 
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .email()
      .required(),
    profession : Joi.string()
    .required()
    .label("Profession") 
  });


   //// fetch vendor data from database
  async componentDidMount() {
    const userId = this.props.match.params.id;
    if (userId === "new") {
      this.setState({ load: true });
      return;
    }

     const { data : vendor } = await getVendor(userId) ;
    //  console.log(vendor);
     
      if (vendor.error) {
         toast.error("Database error,vendor not found");
         return ;
      } ;
      this.setState(() => ({
            vendor: vendor,
            load: true
      }));
  
  }
   
  //// uradi back sa logikom na refresh stranice
  handleBack = () => {
    
    this.props.history.goBack() ;
    // this.props.history.push("/admin");
  }

  handleInputChange = (e) => {
    
    
    const newVendorState = { ...this.state.vendor };
    newVendorState[e.target.name] = e.target.value;

    this.setState(() => ({
      vendor: newVendorState
    }));
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //// new user submit or edit old one
    const result = await saveVendor(this.state.vendor);

    // console.log( "da li je prosao edit" , result.data.success);
    

    if (result.data.success) {
      this.handleBack();
   }
    if (result.data.error) {
      toast.error(result.data.error);
    }
  }

  //// validate the whole form before submitng data to database
  validate = () => {
    const vendorCopy = { ...this.state.vendor };

    delete vendorCopy._id;
    delete vendorCopy.__v;
    delete vendorCopy.calendar;
    delete vendorCopy.phone;
    delete vendorCopy.status;

    const result = Joi.validate(vendorCopy, this.schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };




  render() {
    const {load} = this.state ;
     
    if (load === false) {
      return (
        <div>
          <AdminNavbar pageName="Vendor" />
          <TableName tablename="Loading..." />
          <ToastContainer />
        </div>
      );
    }
    
    const {email, name, profession, _id : id , phone} = this.state.vendor ;
    

    return (
      <div>
        <ToastContainer />
        <AdminNavbar
          pageName={
            this.props.match.params.id === "new"
              ? "New Vendor"
              : name
          }
        />

       <VendorForm
          id={id}
          error={this.state.errors}
          phone ={phone}
          name={name}
          email={email}
          profession={profession}
          onChange={this.handleInputChange}
          onBack={this.handleBack}
          onSubmit={this.handleSubmit}
        />

      </div>
    )
  }
}

export default Vendor ;



