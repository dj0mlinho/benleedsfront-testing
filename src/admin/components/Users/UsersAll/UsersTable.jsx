import React from "react";

import styles from "./UsersTable.module.css";

import Button from "../../Ui/Button/Button"

export default function UsersTable({ users, onSelectUser, onNewUser }) {
  return (
    <table className={"table table-hover table-responsive-sm " + styles.Table}>
      <thead>
        <tr className="">
          <th className="" scope="col">
            User name
          </th>
          <th className="" scope="col">
            Email
          </th>
          <th className="" scope="col">
            Region
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr
            onClick={() => onSelectUser(user.name, user._id)}
            className={styles.UserClick}
            key={user._id}
            >
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td> {user.region}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3"><Button clicked={onNewUser} >Add New User</Button></td>
        </tr>
      </tbody>
    </table>
  );
}

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
