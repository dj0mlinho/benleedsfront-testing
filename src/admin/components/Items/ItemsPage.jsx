import React from "react";

import styles from "./ItemsPage.module.css";

import Spinner from "../../components/Ui/Spinner/Spinner";
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button/Button";

export default function ItemsPage({
  name,
  handleInputChange,
  price,
  disabled,
  roomsArrey,
  onSelectChange,
  selectedRoomSubArrey
}) {
  return (
    <div className={styles.ItemsPageWrapper}>
      <div className={styles.ItemsPageCreate}>
        <h4>Create New Items</h4>
        <div className={styles.ItemsPageCreate_block}>
          <div className={styles.ItemsPageCreate_block__first}>
            <span> Room : </span>
            <select
              onChange={(e) => onSelectChange(e, "room")}
              className="form-control form-control-sm"
            >
              <option>Select</option>
              {roomsArrey.map(room => (
                <option key={room}>{room}</option>
              ))}
            </select>
            <span>Subcategory : </span>
            <select
              onChange={(e) => onSelectChange(e, "sub")}
              disabled={disabled.firstSubCat}
              className="form-control form-control-sm"
            >
              <option>Select</option>
              {selectedRoomSubArrey.map(subCat => (
                <option key={subCat}>{subCat}</option>
              ))}
            </select>
          </div>
          <div className={styles.ItemsPageCreate_block__second}>
            <span> Name : </span>
            <input
              className="form-control form-control-sm"
              type="text"
              name="name"
              value={name}
              disabled={disabled.firstName}
              onChange={handleInputChange}
            />
            <span> Price : </span>
            <input
              className="form-control form-control-sm"
              type="number"
              name="price"
              step=".01"
              disabled={disabled.firstPrice}
              value={price}
              onChange={handleInputChange}
            />
          </div>
          <Button>ADD</Button>
        </div>
      </div>
      <div className={styles.ItemsPageCRAD}></div>
    </div>
  );
}
