import React, { Component } from "react";

import { toast } from "react-toastify";

import { getAllRooms, rooms_fixed, createItem } from "../../services/items";

import Spinner from "../../components/Ui/Spinner/Spinner";
import ItemsPage from "../../components/Items/ItemsPage";
import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin";

export class Items extends Component {
  constructor(props) {
    super(props);

    let roomsArrey = [];
    rooms_fixed.forEach(room => {
      roomsArrey.push(room.name);
    });
    let roomsArreySort = roomsArrey.sort();

    // let codedRoomsArrey = [];
    // rooms_fixed.forEach(room => {
    //   codedRoomsArrey.push(room.name);
    // });
    // let codedRoomsArreySort = codedRoomsArrey.sort()

    this.state = {
      // codedRoomsArrey : codedRoomsArreySort,
      roomsArrey: roomsArreySort,
      rooms: rooms_fixed,
      load: false,
      createItemErrorMsgs: [],
      selRoomObj: null,
      selectedRoom: null,
      selectedSubCat: null,
      selectedRoomSubArrey: [],
      createItemsInput: {
        name: "",
        price: 0
      },
      disabled: {
        firstSubCat: true,
        firstPrice: true,
        firstName: true,
        btn: true
      }
    };
  }

  //// handle select input for create Items
  handleSelectChange = (e, type) => {
    if (type === "room") {
      if (e.target.value === "Select") {
        this.setState({
          selectedRoom: e.target.value
        });
        return;
      }
      const selectedRoom = e.target.value;
      const selRoomObj = this.state.rooms.find(
        room => room.name === selectedRoom
      );
      const selectedRoomSubArrey = selRoomObj.subcategories;
      const diabledCopy = { ...this.state.disabled };
      diabledCopy.firstSubCat = false;

      this.setState((state, props) => ({
        selRoomObj: selRoomObj,
        selectedRoom: selectedRoom,
        selectedRoomSubArrey: selectedRoomSubArrey,
        disabled: diabledCopy
      }));
    }

    if (type === "sub") {
      if (e.target.value === "Select") {
        return;
      }
      const selectedSubCat = e.target.value;
      const diabledCopy = { ...this.state.disabled };
      diabledCopy.firstPrice = false;
      diabledCopy.firstName = false;
      diabledCopy.btn = false;

      this.setState((state, props) => ({
        selectedSubCat: selectedSubCat,
        disabled: diabledCopy
      }));
    }
  };

  //// input change for create item
  hadnleInputChange = e => {
    const createItemsInputCopy = { ...this.state.createItemsInput };
    createItemsInputCopy[e.target.name] = e.target.value;

    this.setState((state, props) => ({
      createItemsInput: createItemsInputCopy
    }));
  };

  ////// create item and validation !!!!
  validateCreateItem = () => {
    let createItemErrorMsgs = [];
    let name = this.state.createItemsInput.name;
    const { selectedRoom, selRoomObj, selectedSubCat } = this.state;

    let indexOfNumer = selRoomObj.subcategories.indexOf(selectedSubCat);
    if (indexOfNumer < 0) {
      createItemErrorMsgs.push("Please select valid subcategory");
    }

    if (!name.trim()) {
      createItemErrorMsgs.push("Name can't be empty");
    }

    if (selectedRoom === "Select") {
      createItemErrorMsgs.push("Please select room");
    }

    this.setState((state, props) => ({
      createItemErrorMsgs: createItemErrorMsgs
    }));

    if (createItemErrorMsgs.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  hadnleCreateItem = async () => {
    const item = {
      price: this.state.createItemsInput.price,
      name: this.state.createItemsInput.name,
      subcategory: this.state.selectedSubCat,
      room: this.state.selectedRoom
    };
    ////later refactor this f to receive arguments !!!
    let valid = this.validateCreateItem();

    if (valid) {
      try {
        await createItem(item);
        toast.success("Item Created!");
        let createItemsInput = {...this.state.createItemsInput}
        createItemsInput.name = "" ;
        createItemsInput.price = 0 ;
        this.setState((state,props) => ({
          createItemsInput : createItemsInput
        }))
      } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error + " " + "Please try again");
        } else {
          toast.error(error.response.statusText);
        }
      }
    } else {
      return;
    }
  };

  render() {
    return (
      <PageNameAdmin pageName={this.props.pageName}>
        {console.log("rooms", this.state.rooms)}
        {console.log("state", this.state)}
        <ItemsPage
          onCreateItem={this.hadnleCreateItem}
          onInputChange={this.hadnleInputChange}
          onSelectChange={this.handleSelectChange}
          selectedRoomSubArrey={this.state.selectedRoomSubArrey}
          roomsArrey={this.state.roomsArrey}
          rooms={this.state.rooms}
          disabled={this.state.disabled}
          price={this.state.createItemsInput.price}
          name={this.state.createItemsInput.name}
          createItemErrorMsgs={this.state.createItemErrorMsgs}
        />
      </PageNameAdmin>
    );
  }
}

export default Items;
