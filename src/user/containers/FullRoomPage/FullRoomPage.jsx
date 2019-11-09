import React, { Component, Children } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  roomsEndpoint,
  itemsEndpoint,
  jobsEndpoint,
  updateQuestion,
  reportsEndpoint
} from "../../services/http";
// import Joi from "joi-browser";
// import Form from "./common/form";
// import Checkbox from "./checkbox.jsx";
import Button from "../../components/UI/ButtonCustom/Button";
import SpinnerCustom from "../../components/UI/Spinner/Spinner";
import styles from "./FullRoomPage.module.css";
import logo from "../../img/ben-leeds-logo.png";
import SearchBox from "../../components/UI/SearchBox/SearchBox";
class FullRoomPage extends Component {
  state = {
    spinner: true,
    datas: [],
    comment: false,
    job: [],
    checked: {},
    roomCommentsState: []
  };
  async componentDidMount() {
    const roomName = this.props.match.params.m;
    const token = localStorage.getItem("token");

    const { data: resRooms } = await axios.get(
      roomsEndpoint + `?name=${this.props.match.params.m}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    const { data: resReport } = await axios.get(
      reportsEndpoint + "/" + this.props.match.params.id,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    console.log("data");
    this.setState({
      spinner: false,
      room: resRooms.data[0].subcategories,
      roomName,
      roomCommentsFromBase: resReport.data.roomComments
    });
  }

  handleSubcategories = async sub => {
    const token = localStorage.getItem("token");
    const { data: resItems } = await axios.get(
      itemsEndpoint + `?room=${this.props.match.params.m}&subcategory=${sub}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (resItems.success == true) {
      const { data: resJobs } = await axios.get(
        jobsEndpoint +
          `?report=${this.props.match.params.id}&room=${this.props.match.params.m}&subcategory=${sub}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      console.log(resJobs, resItems);
      if (resJobs.success == true) {
        const items = resItems.data;
        const jobs = resJobs.data;

        const itemsiii = items.map(
          m =>
            jobs.find(j => j.item._id == m._id) == undefined
              ? m
              : jobs.find(j => j.item._id == m._id)

          // ? (m = jobs.find(j => j.item._id == m._id))
          // : { ...m }
        );
        console.log(itemsiii, "items+jobs");
        // const jobsiii = jobs.find(m => m.item._id == itemsiii._id);

        this.setState({ items: itemsiii });
      }
    }
  };
  handleCommentInput = (e, id) => {
    const comment = this.state.comment;

    this.setState({ comment: true, id });
  };

  handleQuantityInput = (e, id) => {
    let items = [...this.state.items];
    const it = items.filter(i =>
      i._id == id ? (i.quantity = parseInt(e.target.value)) : i
    );

    this.setState({ items });
  };

  handleChangeArea = (e, id) => {
    let items = [...this.state.items];
    const it = items.filter(i =>
      i._id == id ? (i.comment = e.target.value) : i
    );

    this.setState({ items });
  };
  handleCheckboxChange = async (e, id, sub) => {
    let items = [...this.state.items];
    const it = items.find(i => i._id == id);
    it.checked = !it.checked;
    // items = [...items, items.map(m=>m._id==it._id)];
    // this.setState({ items });
    console.log(items, "itemsi u state");
    console.log(it, "checkbox");

    if (!it.item && it.checked) {
      console.log(it.checked, "checked");
      const totalPrice = it.quantity * it.price;
      const jobs = {
        checked: it.checked,
        price: it.price,
        name: it.name,
        report: this.props.match.params.id,
        item: id,
        quantity: it.quantity,
        totalPrice: totalPrice,
        comment: it.comment,
        room: this.props.match.params.m,
        subcategory: sub
      };

      const token = localStorage.getItem("token");
      console.log(jobs, "radi jobs");
      const { data: resItems } = await axios.post(jobsEndpoint, jobs, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (resItems.success) {
        const bla = resItems.data;
        const kurac = items.map(m => (m._id == id ? bla : m));
        console.log("uslo u update state", kurac, id);
        this.setState({ items: kurac });
      }
      console.log(this.state);
      console.log(resItems, "cekirano");
    } else {
      const totalPrice = it.quantity * it.item.price;
      const jobs = {
        quantity: it.quantity,
        checked: it.checked,
        totalPrice: totalPrice
      };

      console.log("UPDAAATEEE,", it.item);

      const token = localStorage.getItem("token");

      const { data: resItem } = await axios.put(jobsEndpoint + "/" + id, jobs, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (resItem.success) {
        const item = resItem.data;
        const newItemsArray = items.map(m => (m._id == id ? item : m));
        console.log("uslo u update state", newItemsArray, id);
        this.setState({ items: newItemsArray });
      }
      console.log(resItem, "update jobs");
    }
    //   this.setState({ items });
    // }
  };
  handleRoomComment = (e, name) => {
    const roomCommentsState = this.state.roomCommentsState;
    const value = e.target.value;
    const roomComment = {
      roomName: name,
      comment: value
    };

    this.setState({ roomComment });
  };
  handleBackButton = async () => {
    const id = this.props.match.params.id;
    const roomCommentsFromBase = { ...this.state.roomCommentsFromBase };
    const roomComment = this.state.roomComment;
    if (roomCommentsFromBase[0] && roomComment) {
      var roomCommentsArray = Object.keys(roomCommentsFromBase).map(function(
        key
      ) {
        return roomCommentsFromBase[key];
      });

      const newCommentsArray = [roomComment].map(f =>
        roomCommentsArray.find(m => m.roomName == f.roomName)
          ? roomCommentsArray.map(k =>
              k.roomName == roomComment.roomName ? (k = roomComment) : k
            )
          : [...roomCommentsArray, roomComment]
      );

      const report = { roomComments: newCommentsArray[0] };

      const { data: resReport } = await updateQuestion(report, id);
      console.log(resReport);
    } else {
      const id = this.props.match.params.id;
      const roomComment = this.state.roomComment;
      const report = { roomComments: [roomComment] };

      const { data: resReport } = await updateQuestion(report, id);
      console.log(resReport.data);
    }
    this.props.history.push(`/${id}/rooms`);
  };
  handleForwardButton = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/${id}/workorder`);
  };
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleSearchFocus = () => {
    this.textInput.focus();
  };

  render() {
    const searchQuery = this.state.searchQuery;
    let items = this.state.items;
    if (searchQuery) {
      items = this.state.items.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const id = this.state.id;
    console.log(this.state.roomCommentsFromBase, "comments from base");

    const subcategories = this.state.room;
    const roomName = this.state.roomName;
    console.log(roomName);
    return (
      <div className={styles.Profile}>
        <img src={logo}></img>
        {this.state.spinner ? <SpinnerCustom></SpinnerCustom> : null}
        <div
          className="rooms  text-center m-3"
          // ref="iScroll"
          // style={{ height: "600px", overflow: "auto" }}
        >
          <div className={styles.NavigationButtons}>
            {" "}
            <Button click={this.handleBackButton} color="warning m-1">
              Back
            </Button>{" "}
            <Button click={this.handleForwardButton} color="primary m-1">
              Forward
            </Button>{" "}
          </div>

          <div className="m-3">
            {subcategories
              ? subcategories.map(sub => (
                  <Button
                    key={sub}
                    // style={styles.Subbuttons}
                    click={() => this.handleSubcategories(sub)}
                    color="secondary m-1"
                  >
                    {sub}
                  </Button>
                ))
              : null}
          </div>
          <textarea
            // cols="38"
            // rows="2"
            placeholder="Comment"
            // disabled={item.checked}
            onPaste={this.handleRoomComment}
            onChange={e => this.handleRoomComment(e, roomName)}
            name={this.state.roomName}
            // name={item.name}
            // value={item.comment}
            // id={item._id}
            className="textarea-rooms form-control placeholder-input"
          />

          {/* <h1 className="lead m-3">naslov</h1> */}
          {/* <button
            className="button btn btn-primary"
            onClick={() => this.handleExtraItems()}
          >
            nesto
          </button> */}
          {items ? (
            <div>
              <span
                onClick={e => this.firstInput.current.focus()}
                className="search-input btn btn-secondary btn-sm"
              >
                Search by Item's:
              </span>
              <SearchBox
                firstInput={this.firstInput}
                value={searchQuery}
                onChange={this.handleSearch}
              />
              <table className={"table " + styles.Table}>
                <thead>
                  <tr>
                    <th className="item">Item</th>

                    <th className="item">$</th>
                    <th className="item quantity">#</th>
                    {/* <th>Total Price</th> */}
                    {/* <th>Comment</th> */}
                    <th className="item quantity">Total $</th>
                    <th></th>
                    {/* <th className="item">Link</th> */}
                    <th className="item">✔</th>
                  </tr>
                </thead>

                {items.map(item => (
                  <tbody key={item._id}>
                    <tr>
                      <td className="itemTd">
                        {item.name != undefined ? item.name : item.item.name}
                      </td>

                      <td className="itemTd">
                        ${item.price != null ? item.price : "0"}
                      </td>
                      <td className="itemTd">
                        {/* {!item.checked ? ( */}
                        <input
                          disabled={item.checked}
                          name={item.name}
                          label="quantity"
                          onChange={e => this.handleQuantityInput(e, item._id)}
                          value={item.quantity}
                          className={styles.QuantityInput}
                          type="number"
                          min="1"
                          id={item._id}
                        />
                      </td>

                      <td className="itemTd">
                        {item.price * item.quantity
                          ? (item.price * item.quantity).toFixed(2)
                          : "/"}
                        {/* <Link
                          target={this.state.target}
                          onClick={e => this.handleLinks(e, item.link)}
                        >
                          Link
                        </Link> */}
                      </td>
                      <td className="itemTd">
                        <button
                          cbnolor="outline-danger m-1"
                          className="btn btn-secondary"
                          onClick={e => this.handleCommentInput(e, item._id)}
                        >
                          Comment
                        </button>
                        {/* <Link
                          target={this.state.target}
                          onClick={e => this.handleLinks(e, item.link)}
                        >
                          Link
                        </Link> */}
                      </td>
                      <td className="itemTd">
                        <input
                          number={this.state.value}
                          type="checkbox"
                          className="form-control"
                          name={item.name}
                          id={item._id}
                          checked={item.checked}
                          onChange={e =>
                            this.handleCheckboxChange(
                              e,
                              item._id,
                              item.subcategory
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="6">
                        {this.state.comment && id == item._id ? (
                          <textarea
                            // cols="38"
                            // rows="2"
                            placeholder="Comment"
                            disabled={item.checked}
                            onPaste={this.handleChangeArea}
                            onChange={e => this.handleChangeArea(e, id)}
                            name={item.name}
                            value={item.comment}
                            id={item._id}
                            className="textarea-rooms form-control placeholder-input"
                          />
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : null}
          {/* <button
            className="btn btn-primary"
            onClick={() => this.handleExtraItems()}
          >
            Show Extra Items
          </button> */}
        </div>
      </div>
    );
  }
}

export default FullRoomPage;
