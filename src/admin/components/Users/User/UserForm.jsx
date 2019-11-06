import React from "react";

import styles from "./UserForm.module.css";

import Input from "../../Ui/Input/Input";
import Button from "../../Ui/Button/Button";

export default function UserForm({ user, inputChange, onSubmit, newUser, onRegionChange, onDeleteUser, errorMsgs }) {
  //// Fixed region choice
  const regions = ["West LA", "Central LA", "Fernando Valley"];

  const makeOptions = userRegion => {
   let regArrey = regions.filter( region => region !== userRegion);
   regArrey.unshift(userRegion) ;
   return regArrey ;
  };

  return (
    <div className="">
      <form onSubmit={(e) => onSubmit(e, newUser, user._id)} className="">
        <Input
          type="text"
          label="Name:"
          name="name"
          value={user.name}
          changed={inputChange}
        />

        <Input
          type="email"
          label="Email:"
          name="email"
          value={user.email}
          changed={inputChange}
        />
        {newUser ? (
          <Input
            type="password"
            label="Initial Password:"
            name="password"
            value={user.password}
            changed={inputChange}
          />
        ) : null}
        <div className={styles.Options}>
          <span>Select Region :</span>
          <select onChange={onRegionChange} className="form-control">
              {makeOptions(user.region).map(reg => {
              return  <option key={reg} > {reg} </option>
              })}
          </select>
          <div className={styles.ErrorMsgDiv +" " + (errorMsgs.length !== 0 ? styles.errorMsg : null)} >
            {errorMsgs.length !== 0 ? errorMsgs.join(" / ") : "" }
          </div>
          <div className={styles.btnDiv}>
            {newUser ? null : <Button btntype="button" clicked={() => onDeleteUser(user._id)} type="button" btncolor={"ButtonRed"}>Delete User</Button>} 
            <Button>{newUser ? "Add New User" : "Edit user"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// {success: true, data: {…}}
// data:
// createdAt: "2019-10-23T10:36:26.039Z"
// email: "pera@benleedsapp.com"
// name: "Pera"
// region: "Central LA"
// role: "user"
// todo: []
// updatedAt: "2019-10-23T10:36:26.039Z"
// __v: 0
// _id: "5db02d2a24b3a968c43adc43"
// __proto__: Object
// success: true
