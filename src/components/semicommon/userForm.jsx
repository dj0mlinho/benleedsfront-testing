import React from "react";
import Input from "../common/input";
import PictureFrame from "./pictureFrame/pictureFrame";

function UserForm(props) {
  const {
    name,
    onChange,
    onBack,
    onRegionChange,
    password,
    email,
    onSubmit,
    emailPassword,
    error,
    id,
    pictureSelect,
    imgPath
  } = props;

  return (
    <div className="form-container">
      {id !== "" ? <PictureFrame imgPath={imgPath} /> : null}
      <div>
        <form onSubmit={onSubmit} className="form-css">
          <Input
            newLabelClass={"userInputLabel-adj"}
            error={error.name}
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
          />

          <Input
            newLabelClass={"userInputLabel-adj"}
            error={error.password}
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
            type="password"
          />
          <Input
            newLabelClass={"userInputLabel-adj"}
            error={error.email}
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <Input
            newLabelClass={"userInputLabel-adj"}
            error={error.emailPassword}
            label="Email Password"
            name="emailPassword"
            value={emailPassword}
            onChange={onChange}
          />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              <span className="userInputLabel-adj">
                {id === "" ? "Region:" : "Select new region"}
              </span>
            </label>
            <div className="col-sm-10">
              <select onChange={onRegionChange} className="form-control">
                <option>Los Angeles</option>
                <option>Valley</option>
                <option>West Los Angeles</option>
              </select>
            </div>
          </div>

          {/* <div className="row mb-2">
            <div className="col-sm-6 text-left pl-4">
              <span className="pictureSpan">
                
                {id === ""
                  ? "Select user picture :"
                  : "Select new user picture :"}
              </span>
            </div>

            <div className="col-sm-6">
              <input
                className="inputSelectImg"
                type="file"
                accept="image/*"
                onChange={pictureSelect}
              />
            </div>
          </div> */}

          <div className="row">
            <div className="col-6">
              <button
                type="button"
                onClick={onBack}
                className="btn-form-submit"
              >
                Back
              </button>
            </div>
            <div className="col-6">
              <button className="btn-form-submit">
                {id === "" ? "Add New User" : "Edit User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
