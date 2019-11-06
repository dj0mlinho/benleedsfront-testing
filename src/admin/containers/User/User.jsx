import React, { Component } from "react";

import styles from "./User.module.css";
import { toast } from "react-toastify";

import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin";
import Spinner from "../../components/Ui/Spinner/Spinner";
import UserForm from "../../components/Users/User/UserForm";

import {
  getUser,
  createUser,
  editUser,
  deleteUser
} from "../../services/users";

export class User extends Component {
  state = {
    load: false,
    newUser: false,
    errorMsgs: [],
    user: {
      email: "",
      name: "",
      region: "West LA",
      password: ""
    }
  };

  async componentDidMount() {
    let userId = this.props.match.params.id;
    if (userId == "new") {
      this.setState({
        load: true,
        newUser: true
      });
      return;
    }

    try {
      const { data } = await getUser(userId);

      this.setState({
        load: true,
        user: data.data
      });
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error + " Login again!");
      } else {
        toast.error(error.response.statusText + " Login again!");
      }
    }
  }

  redirectBack = () => {
    this.props.history.replace("/users");
  };

  //// validate user
  validate = user => {
    let errorMsgs = [];

    if (!user.name.trim()) {
      errorMsgs.push("Name can't be empty");
    }

    //// if we use existing user , he doesn't have password prop
    if (user.password ? !user.password.trim() : null) {
      errorMsgs.push("Password can't be empty");
    }

    if (!user.email.trim()) {
      errorMsgs.push("Email can't be empty");
    }

    if (user.email) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!pattern.test(user.email)) {
        errorMsgs.push("Please enter a valid Email");
      }
    }

    this.setState({
      errorMsgs: errorMsgs
    });

    if (errorMsgs.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  //// delete user
  handleDeleteUser = async id => {
    const yesOrNow = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (yesOrNow) {
      try {
        const { data } = await deleteUser(id);
        console.log(data);

        this.redirectBack();
      } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error )
         } else {
          toast.error(error.response.statusText )
         }
      }
    }
    return;
  };

  handleInputChange = e => {
    const newUSer = { ...this.state.user };
    newUSer[e.target.name] = e.target.value;
    this.setState({
      user: newUSer
    });
  };

  //// user region select
  handleRegionChange = e => {
    const selectedRegion = e.target.value;
    const userCopy = { ...this.state.user };
    userCopy.region = selectedRegion;
    this.setState({
      user: userCopy
    });
  };

  handleSubmit = async (e, checkNewUser, userId) => {
    e.preventDefault();

    const userCopy = { ...this.state.user };
    let validate = this.validate(userCopy);

    //// validation pass
    if (validate) {
      // Create new user
      if (checkNewUser) {
        try {
          const newUser = this.state.user;
          const { data } = await createUser(newUser);
          this.redirectBack();
        } catch (error) {
          if (error.response.data.error) {
            toast.error(error.response.data.error)
           } else {
            toast.error(error.response.statusText + " Login again!")
           }
        }
      }
      // Edit old user
      try {
        const userCopy = { ...this.state.user };
        const editedUser = {
          name: userCopy.name,
          email: userCopy.email,
          region: userCopy.region
        };
        const { data } = await editUser(editedUser, userId);
        this.redirectBack();
      } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error )
         } else {
          toast.error(error.response.statusText + " Login again!" )
         }
      }
    } else {
      return;
    }
  };

  render() {
    let user = null;

    if (!this.state.load) {
      user = <Spinner />;
    }

    if (this.state.load) {
      user = (
        <UserForm
          newUser={this.state.newUser}
          user={this.state.user}
          inputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          onRegionChange={this.handleRegionChange}
          onDeleteUser={this.handleDeleteUser}
          errorMsgs={this.state.errorMsgs}
        />
      );
    }

    return (
      <PageNameAdmin pageName={this.props.location.state.name}>
        {user}
      </PageNameAdmin>
    );
  }
}

export default User;
