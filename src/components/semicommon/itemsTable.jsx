import React, { Component } from "react";
import Pagination from "../common/pagination";
import _ from "lodash";
import SearchBox from "../common/search";

class ItemsTable extends Component {
  render() {
    const {
      selectedRoom,
      itemsTableShow,
      submitNew,
      onChangeNew,
      onChange,
      editItem,
      deleteItem,
      newItem,
      paginate,
      somethingPerPage,
      currentPage,
      onOptionChange,
      onSearch,
      searchOption,
      searchQuery,
      options
    } = this.props;

    console.log("selected room na tabeli", selectedRoom);

    const room = selectedRoom.room.name;

    console.log("room name", room);

    let itemsVar = null;

    if (room !== "extra") {
      itemsVar = selectedRoom.items.filter(item => item.status === "regular");
    } else {
      console.log("usao gde treba");

      itemsVar = selectedRoom.items;
    }

    console.log("itemsVar kad selektujem extra", itemsVar);

    //// lodash sort when i have case sensitive names !!!!
    let sorted = _.orderBy(
      itemsVar,
      [item => item.name.toLowerCase()],
      ["asc"]
    );

    let searchedArrey = null;
    let itemsPaginated = null;

    //// first check if the search is active and then paginate searched Arrey !!!!
    if (searchQuery !== "") {
      searchedArrey = sorted.filter(items =>
        items[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
      );

      const indexOfLast = currentPage * somethingPerPage;
      const indexOfFirst = indexOfLast - somethingPerPage;
      itemsPaginated = searchedArrey.slice(indexOfFirst, indexOfLast);

      //// if not , just paginate the initial arrey !!!!
    } else {
      const indexOfLast = currentPage * somethingPerPage;
      const indexOfFirst = indexOfLast - somethingPerPage;
      itemsPaginated = sorted.slice(indexOfFirst, indexOfLast);
    }

    return (
      <>
        <table
          className={`table table-bordered table-sm table-hover ${
            itemsTableShow === false ? "item-table-show" : null
          }`}
        >
          <thead>
            <tr>
              <th scope="col">
                <span>Item name,subcategory and price</span>

                <div>
                  <SearchBox
                    resetPadding={true}
                    options={options}
                    onOptionChange={onOptionChange}
                    value={searchQuery}
                    onChange={onSearch}
                  />
                </div>
              </th>
              <th className="dsp-block border-bottom-reset" scope="col">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="padding-b items-table-padding-td">
                <form>
                  <div className="form-group row">
                    <div className="col-sm-3">
                      <div className="row">
                        <label className="col-sm-3 col-form-label form-control-sm font-weigt-700">
                          Name:
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={onChangeNew}
                            name="name"
                            type="text"
                            className="form-control form-control-sm"
                            value={newItem.name}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="row">
                        <label className="col-sm-6 col-form-label form-control-sm font-weigt-700">
                          Subcategory:
                        </label>

                        <div className="col-sm-6">
                          <input
                            onChange={onChangeNew}
                            name="subCategory"
                            type="text"
                            className="form-control form-control-sm"
                            value={newItem.subCategory}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="row">
                        <label className="col-sm-3 col-form-label form-control-sm font-weigt-700">
                          Price:&#36;
                        </label>

                        <div className="col-sm-9">
                          <input
                            onChange={onChangeNew}
                            name="price"
                            step=".01"
                            type="number"
                            className="form-control form-control-sm"
                            value={newItem.price}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="row">
                        <label className="col-sm-3 col-form-label form-control-sm font-weigt-700">
                          Link:
                        </label>

                        <div className="col-sm-9">
                          <input
                            onChange={onChangeNew}
                            name="link"
                            type="text"
                            className="form-control form-control-sm"
                            value={newItem.link}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </td>
              <td className="padding-b">
                <button
                  onClick={() => submitNew(room)}
                  className="btn-table-end btn-line-hight reset-top-margin"
                >
                  Add
                </button>
              </td>
            </tr>
            {itemsPaginated.length === 0 ? (
              <tr>
                <td>There is no items in this room</td>
              </tr>
            ) : (
              itemsPaginated.map(item => (
                <tr className="mob-box-responsive" key={item._id}>
                  <td className="padding-b items-table-padding-td">
                    <form className="form-items">
                      <div className="form-group row">

                        <div className="col-sm-3">
                           <div className="row">
                        <label className="col-sm-3 col-form-label form-control-sm">
                          Name:
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            rows="3"
                            cols="50"
                            value={item.name}
                            onChange={onChange}
                            name="name"
                            type="text"
                            className="form-control form-control-sm"
                            id={item._id}
                          />
                        </div>
                        </div>
                        </div>

                        <div className="col-sm-4">
                          <div className="row">
                        <label className="col-sm-6 col-form-label form-control-sm">
                          Subcategory:
                        </label>        
                        <div className="col-sm-6">
                          <input
                            value={item.subCategory}
                            onChange={onChange}
                            name="subCategory"
                            type="text"
                            className="form-control form-control-sm"
                            id={item._id}
                          />
                        </div>
                      </div>
                      </div>

                      <div className="col-sm-2">
                         <div className="row">
                        <label className="col-sm-3 col-form-label form-control-sm">
                          Price:&#36;
                        </label>
                        <div className="col-sm-9">
                          <input
                            value={item.price}
                            onChange={onChange}
                            id={item._id}
                            name="price"
                            step=".01"
                            type="number"
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                        </div>
                     </div>
                        
                     <div className="col-sm-3">
                        <div className="row">
                        <label className="col-sm-3 col-form-label form-control-sm">
                          Link:
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={onChange}
                            name="link"
                            type="text"
                            className="form-control form-control-sm"
                            value={item.link}
                            id={item._id}
                          />
                        </div>
                        </div>
                        </div>

                      </div>
                    </form>
                  </td>
                  <td className="adj-padding-items-btn">
                    <button
                      onClick={() => editItem(item)}
                      className="btn btn-sm mdc-button mb-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="row">
          <div className="col float-right">
            <Pagination
              currentPage={currentPage}
              total={searchQuery !== "" ? searchedArrey.length : sorted.length}
              somethingPerPage={somethingPerPage}
              paginate={paginate}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ItemsTable;
