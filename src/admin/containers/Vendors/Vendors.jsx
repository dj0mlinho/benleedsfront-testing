import React, { Component } from "react";

import styles from "./Vendors.module.css";
import { toast } from "react-toastify";

import { getAllVendors } from "../../services/vendors";

import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin";
import Spinner from "../../components/Ui/Spinner/Spinner";
import VendorsTable from "../../components/Vendors/VendorsAll/VendorsTable";

export class Vendors extends Component {
  state = {
    load: false,
    vendors: null,
    selectedProffesion: null,
    vendorsProfessions: null,
    vendorsByProffesion: []
  };

  async componentDidMount() {
    try {
      const { data } = await getAllVendors();
      const vendors = data.data;

      //// extracting dinamicly vendors proffesions
      const vendorsArrey = [];
      vendors.forEach(vendor => {
        vendorsArrey.push(vendor.function);
      });
      const vendorsProfessions = [...new Set(vendorsArrey)];

      this.setState((state, props) => ({
        load: true,
        vendors: vendors,
        vendorsProfessions: vendorsProfessions
      }));
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error + " !");
      } else {
        toast.error(error.response.statusText + " !");
      }
    }
  }
 
  

  handleProffesionChange = e => {
    if (e.target.value === "Select") {
      return;
    }

    const selectedProffesion = e.target.value;
    const vendorsByProffesion = this.state.vendors.filter(
      vendor => vendor.function === selectedProffesion
    );

    this.setState((state, props) => ({
      vendorsByProffesion: vendorsByProffesion, 
      selectedProffesion : selectedProffesion

    }));
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  handleClickVendor = (company, id) => {
    if (company === "newVendor") {
      this.props.history.push({
        pathname: "/vendors/new",
        state: {
          name: "Create New Vendor", 
          selectedProffesion : this.state.selectedProffesion
        }
      });
    } else {
      this.props.history.push({
        pathname: "/vendors/" + id,
        state: {
          name: company, 
          selectedProffesion : this.state.selectedProffesion
        }
      });
    }
  };

  render() {
    const { vendorsProfessions } = this.state;

    let vendors = null;
    if (!this.state.load) {
      vendors = <Spinner />;
    }

    if (this.state.load) {
      vendors = (
        <div className={styles.ProffesionSelectDiv}>
          <div>Select vendors by function:</div>
          <div>
            <select
              className="form-control form-control-sm"
              onChange={this.handleProffesionChange}
            >
              <option>Select</option>
              {vendorsProfessions.map(proff => (
                <option key={proff}>{proff}</option>
              ))}
            </select>
          </div>
          <VendorsTable
            onBackClick={this.handleBackClick}
            onClickVendor={this.handleClickVendor}
            vendorsByProffesion={this.state.vendorsByProffesion}
          />
        </div>
      );
    }

    return (
      <PageNameAdmin pageName={this.props.pageName}>{vendors}</PageNameAdmin>
    );
  }
}

export default Vendors;

// {_id: "5db9f67cdaec987fea3faa92", function: "Electrician", contact: "James Hernandez", company: "", phoneNumber: "310-978-5436", …}
// 10: {_id: "5db9f67cdaec987fea3faa94", function: "Elevator", contact: "", company: "Golden State", phoneNumber: "(818) 782-3000", …}
// 11: {_id: "5db9f67cdaec987fea3faa93", function: "Elevator", contact: "Richelle Buller", company: "Hoist Elevator Comapny", phoneNumber: "213-689-9108", …}
// 12:
// company: "Amtech Elevator"
// contact: ""
// createdAt: "2019-10-30T20:45:48.945Z"
// email: ""
// function: "Elevator"
// phoneNumber: "(323) 478-2100"
// phoneNumber2: "(323) 478-2130"
// reports: []
// updatedAt: "2019-10-30T20:45:48.945Z"
// __v: 0
// _id: "5db9f67cdaec987fea3faa95"
// __proto__: Object
// 13: {_id: "5db9f67cdaec987fea3faa96", function: "Eviction", contact: "Edward L Felman", company: "Lawyer", phoneNumber: "(818) 728-7920", …}
// 14: {_id: "5db9f67cdaec987fea3faa97", function: "Eviction", contact: "Richard Daggenhurst", company: "Lawyer", phoneNumber: "(818) 728-7920", …}
