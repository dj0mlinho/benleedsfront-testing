import React, { Component } from "react";

import styles from "./UsersPage.module.css";
import { toast } from "react-toastify";

import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin";
import Spinner from "../../components/Ui/Spinner/Spinner";
import UsersTable from "../../components/Users//UsersAll/UsersTable";
import { getAllUsers  } from "../../services/users";

export class UsersPage extends Component {
  state = {
    load: false,
    users: null
  };

  async componentDidMount() {
    try {
      const { data } = await getAllUsers();
      const users = data.data;
      this.setState({
        load: true,
        users: users
      });
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error + " Login again!")
       } else {
        toast.error(error.response.statusText + " Login again!")
       }
    }
  }

  handleSelectUser =  (name, id) => {
    this.props.history.push({
      pathname : "/users/" + id ,
      state : {
        name : name
      }
    })
  };

  handleNewUser = () => {
    this.props.history.push({
      pathname : "/users/new"  ,
      state : {
        name : "Create New User"
      }
    })
  }

  render() {
    let users = null;

    if (!this.state.load) {
      users = <Spinner />;
    }

    if (this.state.load) {
      users = (
        <UsersTable
          users={this.state.users}
          onSelectUser={this.handleSelectUser}
          onNewUser={this.handleNewUser}
        />
      );
    }

    return (
      <PageNameAdmin pageName={this.props.pageName}>{users}</PageNameAdmin>
    );
  }
}

export default UsersPage;

// data: Array(4)
// 0:
//   createdAt: "2019-10-23T10:36:26.039Z"
//   email: "pera@benleedsapp.com"
//   name: "Pera"
//   region: "Central LA"
//   role: "user"
//   todo: []
//   updatedAt: "2019-10-23T10:36:26.039Z"
// __v: 0
// _id: "5db02d2a24b3a968c43adc43"
// __proto__: Object
// 1: {role: "user", todo: Array(0), _id: "5dae1506939a39747f6b2224", name: "Yoana", email: "yoana@benleedsapp.com", …}
// 2: {role: "user", todo: Array(0), _id: "5dacdb3759bec0698c2947bf", name: "Nicole", email: "nicole@benleedsapp.com", …}
// 3: {role: "user", todo: Array(0), _id: "5dac68609beb6450c35af5ba", name: "Roxana", email: "roxana@benleedsapp.com", …}
// length: 4
