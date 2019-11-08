import React, { Component } from "react";

import { getAllRooms, rooms_fixed } from "../../services/items";

import styles from "./Items.module.css";

import Spinner from "../../components/Ui/Spinner/Spinner";
import ItemsPage from "../../components/Items/ItemsPage";

import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin";

export class Items extends Component {
  constructor(props) {
    super(props);

    let roomsArrey = [];
    rooms_fixed.forEach(room => {
      roomsArrey.push(room.properName);
    });
    let roomsArreySort = roomsArrey.sort()

    this.state = {
      roomsArrey: roomsArreySort,
      rooms: rooms_fixed,
      load: false,
      selectedRoom: null,
      selectedSubCat: null,
      selectedRoomSubArrey: [], 
      name : "",
      price : "",
      disabled : {
        firstSubCat : true ,
        firstPrice : true ,
        firstName : true 
      } 
    };
  }
  
  
  //// handle select input for create Items 
  handleSelectChange = (e, type) => {
    if (type === "room") {
       if (e.target.value === "Select") {
          return ;
       }
      const selectedRoom = e.target.value ;
      const selectedRoomSubArrey = this.state.rooms.find(room => room.properName === selectedRoom).subcategories ;
      const diabledCopy = {...this.state.disabled} 
      diabledCopy.firstSubCat = false 
      
      this.setState((state, props) => ({
        selectedRoom : selectedRoom ,
        selectedRoomSubArrey : selectedRoomSubArrey ,
        disabled : diabledCopy
      }))
    }
  }

  render() {
    return (
      <PageNameAdmin pageName={this.props.pageName}>
        {console.log("rooms", this.state.rooms)}
        {console.log("state", this.state)}
        <ItemsPage
        onSelectChange={this.handleSelectChange} 
        selectedRoomSubArrey ={this.state.selectedRoomSubArrey}
        roomsArrey={this.state.roomsArrey}
        rooms={this.state.rooms}
        disabled={this.state.disabled} 
        />
      </PageNameAdmin>
    );
  }
}

export default Items;

// {
//   "success": true,
//   "count": 16,
//   "pagination": {},
//   "data": [
//       {
//           "subcategories": [
//               "A/C",
//               "Blinds",
//               "Cabinet",
//               "Ceilings",
//               "Closets",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Heater",
//               "Lights",
//               "Mirrors",
//               "Smoke Alarm",
//               "Wall heater",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd6",
//           "name": "07. Master Bed",
//           "properName": "Master Bedroom",
//           "photo": "masterbedroom.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Accessories",
//               "Cabinets",
//               "Counter tops",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Faucets",
//               "Floors",
//               "GFCI",
//               "Lights",
//               "Mirrors",
//               "Paper Holder",
//               "Shower",
//               "Shower tiles",
//               "Sinks",
//               "Tiles",
//               "Toilet",
//               "Tubs",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd8",
//           "name": "08. Master Bath",
//           "properName": "Master Bathroom",
//           "photo": "masterbathroom.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Accessories",
//               "Cabinets",
//               "Counter tops",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Faucets",
//               "Floors",
//               "GFCI",
//               "Jacuzzi",
//               "Lights",
//               "Mirrors",
//               "Paper Holder",
//               "Shower",
//               "Shower tiles",
//               "Sinks",
//               "Tiles",
//               "Toilet",
//               "Tubs",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd7",
//           "name": "09. 1/2 Bath",
//           "properName": "Half Bathroom",
//           "photo": "halfbathroom.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Cabinets",
//               "Doors",
//               "Lights",
//               "Switch"
//           ],
//           "_id": "5db49bf056c7130534beddda",
//           "name": "11. Loft",
//           "properName": "Loft",
//           "photo": "loft.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Cabinets",
//               "Doors",
//               "Electric",
//               "GFCI",
//               "Lights"
//           ],
//           "_id": "5db49bf056c7130534bedddb",
//           "name": "12. Laundry",
//           "properName": "Laundry",
//           "photo": "laundry.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Cabinets",
//               "Doors",
//               "Electric",
//               "Lights"
//           ],
//           "_id": "5db49bf056c7130534bedddd",
//           "name": "14. Balcony",
//           "properName": "Balcony",
//           "photo": "balcony.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Cabinets",
//               "Doors",
//               "Electric",
//               "Extras",
//               "Lights",
//               "Plumbing"
//           ],
//           "_id": "5db49bf056c7130534bedddc",
//           "name": "13. Patio",
//           "properName": "Patio",
//           "photo": "patio.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "A/C",
//               "Blinds",
//               "Cabinets",
//               "Ceilings",
//               "Closets",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Heater",
//               "Lights",
//               "Mirrors",
//               "Smoke Alarm",
//               "Wall heater",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd9",
//           "name": "10. Extra Bed",
//           "properName": "Extra Bedroom",
//           "photo": "extrabedroom.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Diir",
//               "Trash"
//           ],
//           "_id": "5db49bf056c7130534beddde",
//           "name": "15. Other",
//           "properName": "Other",
//           "photo": "other.png",
//           "createdAt": "2019-10-26T19:18:08.161Z",
//           "updatedAt": "2019-10-26T19:18:08.161Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "A/C",
//               "Blinds",
//               "Ceilings",
//               "Closets",
//               "Doors",
//               "Electric",
//               "Lights",
//               "Lock",
//               "Mirrors",
//               "Smoke Alarm",
//               "Switch",
//               "Vents",
//               "Wall heater",
//               "Wire"
//           ],
//           "_id": "5db49bf056c7130534beddcf",
//           "name": "00. Entrance",
//           "properName": "Entrance",
//           "photo": "entrance.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "A/C",
//               "Blinds",
//               "Cabinets",
//               "Ceilings",
//               "Closets",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Lights",
//               "Lock",
//               "Mirrors",
//               "Smoke Alarm",
//               "Switch",
//               "Vents",
//               "Wall heater",
//               "Windows",
//               "Wire"
//           ],
//           "_id": "5db49bf056c7130534beddd0",
//           "name": "01. Living room",
//           "properName": "Living Room",
//           "photo": "livingroom.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "A/C",
//               "Blinds",
//               "Cabinets",
//               "Ceilings",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Floors",
//               "Lights",
//               "Switch",
//               "Wall heater"
//           ],
//           "_id": "5db49bf056c7130534beddd1",
//           "name": "02. Dining Area",
//           "properName": "Dining Area",
//           "photo": "diningarea.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Appliance",
//               "Blinds",
//               "Cabinets",
//               "Counter Backsplash",
//               "Counter tops",
//               "Dishwasher",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Faucets",
//               "Floors",
//               "Garbage Disposal",
//               "GFCI",
//               "Lights",
//               "Sinks",
//               "Stove",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd2",
//           "name": "03. Kitchen",
//           "properName": "Kitchen",
//           "photo": "kitchen.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Accessories",
//               "Cabinets",
//               "Counter tops",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Exhaust",
//               "Faucets",
//               "Floors",
//               "GFCI",
//               "Lights",
//               "Mirrors",
//               "Shower",
//               "Shower tiles",
//               "Sinks",
//               "Tiles",
//               "Toilet",
//               "Tubs",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd4",
//           "name": "05. Hallway Bath",
//           "properName": "Hallway Bathroom",
//           "photo": "hallwaybathroom.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "Cabinets",
//               "Closets",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Windows"
//           ],
//           "_id": "5db49bf056c7130534beddd3",
//           "name": "04. Hallway",
//           "properName": "Hallway",
//           "photo": "hallway.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       },
//       {
//           "subcategories": [
//               "A/C",
//               "Blinds",
//               "Cabinets",
//               "Ceilings",
//               "Closets",
//               "Doors",
//               "Drawers",
//               "Electric",
//               "Heater",
//               "Lights",
//               "Mirrors",
//               "Smoke Alarm"
//           ],
//           "_id": "5db49bf056c7130534beddd5",
//           "name": "06. Guest Bed",
//           "properName": "Guest Bedroom",
//           "photo": "guestbedroom.png",
//           "createdAt": "2019-10-26T19:18:08.160Z",
//           "updatedAt": "2019-10-26T19:18:08.160Z",
//           "__v": 0
//       }
//   ]
// }
