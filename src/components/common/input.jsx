import React, { Component } from "react";


const Input = props => {
  return (
    <> 
    <div className={`form-group row form-adj`}>
      <label className={`col-sm-2 col-form-label ${props.newLabelClass}`} htmlFor={props.name}>
        <span >{props.label + ":"}</span>{" "}
      </label>
      <div className="col-sm-10">
      <input  
        id={props.name}
        name={props.name}
        value={props.value}
        className="form-control text-center"
        type={props.type || "text"}
        onChange={props.onChange}
      />
      </div>
      <div className="row error-row">
    { props.error && <div className="alert-danger col-sm">{props.error}</div>}
    </div>
    </div>
    
    </>
    
    
  );
};

export default Input;
