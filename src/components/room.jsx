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
    finalData.room = this.props.name;
 
    const data1 = await axios.post(
      process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
      JSON.stringify(finalData)
    );

   

    if (data1.data) {
      let _id = data1.data._id;
      work._id = _id;
      localStorage.setItem("workorder", JSON.stringify(work));
    
    }

    if (data1.statusText === "OK") {
      let allItems = JSON.parse(localStorage.getItem("allItems"));
      let jobsi = [];
      if (data1.data != undefined) {
        jobsi = data1.data.jobs;
      }

      let checked = jobsi.filter(j => allItems.filter(m => m._id == j._id));
   
      let checkedArr = jobsi.map(j => j).map(m => m._id);
      let unchecked = allItems.filter(
        d => d._id != checkedArr.find(m => m == d._id)
      );
      allItems = checked.concat(unchecked);
      localStorage.setItem("allItems", JSON.stringify(allItems));
    
      document.location = "/rooms/" + this.props.id + "/" + this.props.region;
    
    }

   
  };
  render() {
    let isLoading = this.state.isLoading;

    return (
      <div className="col-4 p-3">
        <div className="card mb-3 text-center">
          <Link
            className="links"
            onClick={this.handleLinks}
            // to={"/rooms/" + this.props.id + "/" + this.props.region}
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
