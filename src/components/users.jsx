import React, { Component } from "react";
import AdminNavbar from "./common/adminNavbar";
import getAllUsers from "../services/users";
import {deleteUser} from "../services/users" ;
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom" ;




import TableName from "./common/tableName";



class Users extends Component {
  state = {
    users: null
  };

  async componentDidMount() {
    try {
      const { data: users } = await getAllUsers();
      console.log(users);

      const usersActive = users.filter(user => (
        user.status === "active"
      ));
      this.setState({ users: usersActive });

    } catch (error) {
      if (error.status === 400) {
        toast.error("database error!");
      }
    }
  }



  hadnleDeleteUser = async (userX) =>  {
    const usersCopy = {...this.state.users} ;

    let yesNo = window.confirm(`Are you sure you wont to delete ${userX.name}  ?`)
     
    if (yesNo === true) {
      let users = this.state.users.filter(user => user._id !== userX._id);
      this.setState({users : users}) ;
    } else {
         return ;
    }
   
    const response  = await deleteUser(userX);
      // console.log(response);

      if (response.data.error) {
          toast.error(response.data.error);
          this.setState({users : usersCopy}) ;
      }
  }

  handleBack = () => {
    this.props.history.goBack() ;
  }

  //// try to insert link element on click , for later !!!!!!!!!!!
  newUserRoute =() => {
    this.props.history.push("/admin/users/new") ;
  }

  render() {
    const { users } = this.state;

   ///// waiting to load data from database
    if (users === null) {
      return (
        <div>
          <AdminNavbar pageName="Users" />
          <TableName tablename="Loading..." />
          <ToastContainer />
        </div>
      );
    }

   

    if (users === []) {
      return (
        <div>
          <AdminNavbar pageName="Users" />
          <TableName tablename="No users available" />
          {this.newUserRoute()}
          <ToastContainer />
        </div>
      );
    }

    return (
      <div>
        <ToastContainer />
        <AdminNavbar pageName="Users" />

    <div className="container">
        <TableName tablename="List Of Users" />
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th className="thUser-padding-adj" scope="col">Select</th>
              <th className="thUser-padding-adj" scope="col">Name</th>
              <th className="thUser-padding-adj" scope="col">Region</th>
              <th className="thUser-padding-adj" scope="col">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td className="mt-3" colSpan="3">
                  <p className="h6">
                    There are no users at this moment, please add one or more
                  </p>
                </td>
              </tr>
            ) : null}
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <Link to={`/admin/users/${user._id}`} className="mdc-button btn-sm btn">Select</Link>
                </td>
                <td className="linehight-adj">{user.name}</td>
                <td className="linehight-adj">{user.region}</td>
                <td>
                  <button  onClick={() => this.hadnleDeleteUser(user)} className="btn-sm btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2"><div onClick={() => this.handleBack()} className="btn-table-end">Back</div></td>
              <td colSpan="2"><div onClick={() => {this.newUserRoute()}} className="btn-table-end">Add New</div></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default Users;
