import React, { Component } from "react";
import Input from "../common/input";


class VendorForm extends Component {
  // state = {};
   render() {
    const {
      name,
      onChange,
      onBack,
      phone,
      email,
      onSubmit,
      profession,
      error,
      id,
        
    } = this.props;

    return (
      <div>
        <div className="form-container">
          <div>
         
            <form onSubmit={onSubmit} className="form-css">
              <Input  
                error={error.name}
                label="Name"
                name="name"
                value={name}
                onChange={onChange}
              />
               <Input
                error={error.phone}
                label="Phone number"
                name="phone"
                value={phone}
                onChange={onChange}
              />
               <Input
               error={error.password}
                label="Profession"
                name="profession"
                value={profession}
                onChange={onChange}
                
              />
               <Input
                error={error.email}
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
              />
              <div className="row">
              <div className="col-6">
                <button type="button" onClick={onBack} className="btn-form-submit">
                  Back
                </button>
              </div>
              <div className="col-6">
                <button className="btn-form-submit">{(id==="") ? "Add new vendor" : "Edit vendor" }</button>
              </div>
            </div>
            </form>
           
           
          </div>
        </div>
      </div>
    );
  }
}

export default VendorForm;
