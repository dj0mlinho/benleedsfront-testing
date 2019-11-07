import React from "react";

import styles from "./VendorForm.module.css";

import Input from "../../../components/Ui/Input/Input";
import Button from "../../../components/Ui/Button/Button";

export default function VendorForm({
  vendor,
  inputChange,
  errorMsgs,
  onDeleteVendor,
  newVendor,
  onSubmit,
  onBack,
  btnDisable
}) {
  return (
    <div className="">
      {console.log("vendor for form", vendor)}
      <form onSubmit={e => onSubmit(e, vendor._id)} className="">
        <div className={styles.InputDivs}>
        <Input
          type="text"
          label="Company:"
          name="company"
          value={vendor.company}
          changed={inputChange}
        />
        <Input
          type="text"
          label="Contact:"
          name="contact"
          value={vendor.contact}
          changed={inputChange}
        />
        </div>
        
        <div className={styles.InputDivs}>
         <Input
          type="text"
          label="Function:"
          name="function"
          value={vendor.function}
          changed={inputChange}
        />
        <Input
          type="text"
          label="Phone Number 1:"
          name="phoneNumber"
          value={vendor.phoneNumber}
          changed={inputChange}
        />
        </div>
        <div className={styles.InputDivs}>
        <Input
          type="text"
          label="Phone Number 2:"
          name="phoneNumber2"
          value={vendor.phoneNumber2}
          changed={inputChange}
        />
        <Input
          type="email"
          label="Email:"
          name="email"
          value={vendor.email}
          changed={inputChange}
        />
        </div>
        

        <div className={styles.BtnAndErrorDiv}>
          <div
            className={
              styles.BtnAndErrorDiv_err +
              " " +
              (errorMsgs.length !== 0 ? styles.errorMsg : null)
            }
          >
            {errorMsgs.length !== 0 ? errorMsgs.join(" / ") : ""}
          </div>
          <div className={styles.BtnAndErrorDiv_btn}>
            <Button btntype="button" clicked={onBack}>
              Go Back
            </Button>
            {newVendor ? null : (
              <Button
                disabled={btnDisable}
                btntype="button"
                clicked={() => onDeleteVendor(vendor._id)}
                type="button"
                btncolor={"ButtonRed"}
              >
                Delete Vendor
              </Button>
            )}
            <Button disabled={btnDisable}>{newVendor ? "Create Vendor" : "Update  Vendor"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
