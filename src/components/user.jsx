import React, { Component } from "react";
import { getUser, saveUser, imgUpload } from "../services/users";

import { toast, ToastContainer } from "react-toastify";
import Joi from "joi";

import AdminNavbar from "./common/adminNavbar";
import TableName from "./common/tableName";

import UserForm from "./semicommon/userForm";
import ModalMy from "./common/modal/modal";

import getAllWorkorders from "../services/workOrders";
import { async } from "q";

class User extends Component {
  state = {
    orders: null ,
    images : [] ,
    user: {
      _id: "",
      email: "",
      password: "",
      emailPassword: "",
      name: "",
      region: "Los Angeles"
      // __v : 0
    },
    errors: {},
    load: false,
    modalShowing: false
  };

  //// schema for input check but only on submit form btn click
  schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .label("Password"),
    emailPassword: Joi.string()
      .required()
      .label("Email Password"),
    name: Joi.string()
      .required()
      .label("Name")  
  });

  //// fetch user data from database
  async componentDidMount() {
    const userId = this.props.match.params.id;
    if (userId === "new") {
      this.setState({ load: true });
      return;
    }

    try {
      const { data: orders } = await getAllWorkorders();
      const onlyWoWithoutSaved = orders.filter(order => (
         order.status !== "saved" 
      ) ) ;

      this.setState({ orders: onlyWoWithoutSaved });
      // console.log(orders);
      


      const { data } = await getUser(this.props.match.params.id);
      this.setState(() => ({
        user: data.user,
        load: true
      }));
    } catch (error) {
      if (error.status === 400 || error.status) {
        toast.error("database error!");
      }
    }
  }

  getUserWorkOrders = (userId) => {
     if (this.state.orders.error) {
        let emptyWoArrey = [] ;
        return emptyWoArrey ;
     }

    console.log("wo",this.state.orders);
     

    const woArrey = this.state.orders.filter(order => order.user._id === userId);
    return woArrey ;
    
  }

  


  //// go back on btn click
  handleBack = () => {
    this.props.history.goBack() ;
    // this.props.history.push("/admin/users");
  };

  /////// handle show modal
  hadnleModal = () => {
    this.setState({ modalShowing: true });
  };

  handleCloseModal = () => {
    this.setState({ modalShowing: false });
  };

  //// hadnle input field change and update state
  handleInputChange = e => {
    //// later, for individual input error check   !!!!!

    //   const input = e.target ;
    //   const errors ={...this.state.errors};
    //   const errorMsg  = this.validateInputField(input) ;
    //   if (errorMsg) { errors[input.name] = errorMsg  }
    //   else { delete errors[input.name] } ;

    const newUserState = { ...this.state.user };
    newUserState[e.target.name] = e.target.value;

    this.setState(() => ({
      user: newUserState
      // errors : errors
    }));
  };

  //// later, validate input fileds in real life !!!!!
  validateInputField = input => {};

  //// submit , create new user or edit one
  handleSubmit = async e => {
    e.preventDefault();

    let data = new FormData();
    if (this.state.images[0]) {
      console.log("izabrao sliku i usao!!");

      data.append("image", this.state.images[0]  ,  this.state.images[0].name );
    } else {
      console.log("bez izabrane slike usao !!");
      
      data.append("image", "noImage.jpg");
    }
    
    
    
    

    const errors = this.validate();
    this.setState({ errors: errors || {} });
     
    console.log("error log", errors);
    

    if (errors) return;

    //// new user submit or edit old one
    const result = await saveUser(this.state.user, data);
       

    if (result.data.success) {
    
      this.handleBack();
    }
    if (result.data.error) {
      toast.error(result.data.error);
    }
  };

  //// validate the whole form before submitng data to database
  validate = () => {
    const userCopy = { ...this.state.user };
     

    
    
    delete userCopy._id;
    delete userCopy.__v;
    delete userCopy.status;
    delete userCopy.region;
    delete userCopy.image;
    delete userCopy.imgPath;

    const result = Joi.validate(userCopy, this.schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleRegionChange = (e) => {
    let selectedRegion = e.target.value;
    let user = this.state.user ;
    user.region = selectedRegion ;
    this.setState({
      user : user 
    })
  }

  hadnlePictureSelect = (e) => {
    let images = []
       for (var i = 0; i < e.target.files.length; i++) {
       images[i] = e.target.files.item(i);
    }
   this.setState({
     images : images
   })   

  }
handlePictureUpload = async () => {
    let data = new FormData();
    
     data.append("image", this.state.images[0]  ,  this.state.images[0].name );
     const test = await imgUpload(data) ;
         
         
  }

  render() {
    if (this.state.load === false) {
      return (
        <div>
          <AdminNavbar pageName="User" />
          <TableName tablename="Loading..." />
          <ToastContainer />
        </div>
      );
    }

    const {
      name,
      email,
      password,
      region,
      emailPassword,
      _id: id
    } = this.state.user;

    return (
      <div>
        <ToastContainer />
        <AdminNavbar
          pageName={
            this.props.match.params.id === "new"
              ? "New User"
              : name
          }
        />

       <div className="container">
        {(this.state.user._id !== "") ?
          <ModalMy
            workOrders ={this.getUserWorkOrders(id)}
            user ={this.state.user}
            isOpen={this.state.modalShowing}
            onClose={this.handleCloseModal}
            onShowModal={this.hadnleModal}
          />
         : null}

        <UserForm
          id={id}
          error={this.state.errors}
          emailPassword={emailPassword}
          name={name}
          email={email}
          password={password}
          onRegionChange={this.handleRegionChange}
          onChange={this.handleInputChange}
          onBack={this.handleBack}
          onSubmit={this.handleSubmit}
          pictureSelect={this.hadnlePictureSelect}
          pictureUpload ={this.handlePictureUpload}
        />
        </div>
      </div>
    );
  }
}

export default User;
