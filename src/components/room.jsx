import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import "../css/room.css";
import "../css/links.css";

// const room = props => (
//   <div className="col-4 p-3">
//     <div className="card mb-3 text-center">
//       <Link className="links" to={"/rooms/" + props.id + "/" + props.region}>
//         <img
//           className="card-img-top img-fluid"
//           src={props.image}
//           alt="Card image cap"
//         />
//         <div className="card-footer text-center">{props.name}</div>
//       </Link>
//     </div>
//   </div>
// );
// export default room;

class Room extends Component {
  state = {};

  handleLinks = async () => {
    let isLoadingFullRoom = false;
    localStorage.setItem(
      "isLoadingFullRoom",
      JSON.stringify(isLoadingFullRoom)
    );
    const work = JSON.parse(localStorage.getItem("workorder"));
    let finalData = {};
    finalData.buildingNumber = work.buildingNumber;
    finalData.apartmentNumber = work.apartmentNumber;
    finalData.userId = work.userId;

    // work.autosaveTime = new Date();
    // work.jobs = jobs;
    // localStorage.setItem("workorder", JSON.stringify(work));
    // const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data1 = await axios.post(
      process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data1);

    if (data1.data.workorder) {
      let _id = data1.data.workorder._id;
      work._id = _id;
      localStorage.setItem("workorder", JSON.stringify(work));
      localStorage.setItem("jobs", JSON.stringify(data1.data.workorder.jobs));
    }

    // const jobs = JSON.parse(localStorage.getItem("jobs"));
  };
  render() {
    let isLoading = this.state.isLoading;

    console.log(isLoading);
    return (
      <div className="col-4 p-3">
        <div className="card mb-3 text-center">
          <Link
            className="links"
            onClick={this.handleLinks}
            to={"/rooms/" + this.props.id + "/" + this.props.region}
          >
            <img
              className="card-img-top img-fluid"
              src={this.props.image}
              alt="Card image cap"
            />
            <div className="card-footer text-center">{this.props.name}</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Room;
