import React, { Component } from "react";
import AdminNavbar from "./common/adminNavbar";
import Pagination from "./common/pagination" ;
import SearchBox from "./common/search";
import { getAllVendors, deleteVendor } from "../services/vendor";
import { toast, ToastContainer } from "react-toastify";
import TableName from "./common/tableName";
import { Link } from "react-router-dom";



class Vendors extends Component {
  state = {
    vendors: null,
    currentPage : 1 ,
    vendorsPerPage : 8, 
    searchQuery : "" ,
    searchOption : "name",
    options : [ "name" , "profession" ] ,
    load: false
  };

  async componentDidMount() {
    const response = await getAllVendors();
    if (response.data.error) {
      toast.error("Database error!");
      return;
    }
    
    const vendors = response.data.filter(vendor => (
      vendor.status === "active"
    ));


    this.setState(() => ({
      vendors: vendors,
      load: true
    }));
  }

  hadnleDeleteVendor = async (vendorX) => {

    

    const vendorsCopy = {...this.state.vendors} ;

    let yesNo = window.confirm(`Are you sure you wont to delete ${vendorX.name} ?`)
     
    if (yesNo === true) {
      let vendors = this.state.vendors.filter(vendor => vendor._id !== vendorX._id);
      this.setState({vendors : vendors}) ;
    } else {
         return ;
    }
    const response  = await deleteVendor(vendorX);

    if (response.data.error) {
          toast.error(response.data.error);
          this.setState({vendors : vendorsCopy}) ;
      }
  }

  handleBack = () => {
   this.props.history.goBack() ;
  };

  newVendorRoute = () => {
    this.props.history.push("/admin/vendor/new");
  };

  handlePaginate = (number) => {
    this.setState({
      currentPage : number 
    })
  }

  handleSearch = (query) => {
    this.setState({
      searchQuery : query ,
      currentPage : 1 
    });
  }

  handleOptionsSearch = (e) => {
    this.setState({
      searchOption : e.target.value
    })
  }

  render() {
    

    if (this.state.load === false) {
      return (
        <div>
          <AdminNavbar pageName="Vendors" />
          <TableName tablename="Loading..." />
          <ToastContainer />
        </div>
      );
    }

    const { vendors, currentPage, vendorsPerPage, searchQuery, searchOption } = this.state;

    //// search implement on arrey + pagination !!! 
  let searchedArrey = null ; 
  let vendorsPaginated =null ;

  //// first check if the search is active and then paginate searched Arrey !!!! 
  if (searchQuery !== "") {
    searchedArrey = vendors.filter(vendor => vendor[searchOption].toLowerCase().includes(searchQuery.toLowerCase()))
   
    const indexOfLast = currentPage * vendorsPerPage ;
    const indexOfFirst = indexOfLast - vendorsPerPage ;
    vendorsPaginated = searchedArrey.slice(indexOfFirst, indexOfLast) ;
  
  //// if not , just paginate the initial arrey !!!!
  } else {
    const indexOfLast = currentPage * vendorsPerPage ;
    const indexOfFirst = indexOfLast - vendorsPerPage ;
    vendorsPaginated = vendors.slice(indexOfFirst, indexOfLast)
  }

    //// pagination whit vendor arrey 
    // const indexOfLast = currentPage * vendorsPerPage ;
    // const indexOfFirst = indexOfLast - vendorsPerPage ;
    // const vendorsPaginated = vendors.slice(indexOfFirst, indexOfLast)

    return (
      <div>
        <ToastContainer />
        <AdminNavbar pageName="Vendors" />
        <div className="container">
        <TableName tablename="List Of Vendors" />
        <div>
          <SearchBox 
            options ={this.state.options}
            onOptionChange ={this.handleOptionsSearch}
            value = {this.state.searchQuery}
            onChange ={this.handleSearch}
          />
        </div>
          <table className="table table-bordered  table-sm">
            <thead>
              <tr>
                <th className="vendorTh-adj" scope="col">Select</th>
                <th className="vendorTh-adj" scope="col">Name</th>
                <th className="vendorTh-adj" scope="col">Profession</th>
                <th  scope="col">Delete Vendor</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td className="mt-3" colSpan="3">
                    <p className="h6">
                      There are no vendors at this moment, please add one or
                      more
                    </p>
                  </td>
                </tr>
              ) : null}
              {vendorsPaginated.map(vendor => (
                <tr key={vendor._id}>
                  <td>
                    <Link
                      to={`/admin/vendor/${vendor._id}`}
                      className="mdc-button btn-sm btn"
                    >
                      Select
                    </Link>
                  </td>
                  <td>{vendor.name}</td>
                  <td>{vendor.profession}</td>
                  <td>
                    <button
                      onClick={() => this.hadnleDeleteVendor(vendor)}
                      className="btn-sm btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                 <td colSpan="4">
                
           <Pagination 
                 currentPage={this.state.currentPage}
                 total={(searchQuery !== "") ? searchedArrey.length : vendors.length} 
                 somethingPerPage={this.state.vendorsPerPage}
                 paginate ={this.handlePaginate}
           /> 
           </td> 
              </tr>
              <tr>
                <td colSpan="2">
                  <div
                    onClick={() => this.handleBack()}
                    className="btn-table-end"
                  >
                    Back
                  </div>
                </td>
                <td colSpan="2">
                  <div
                    onClick={() => {
                      this.newVendorRoute();
                    }}
                    className="btn-table-end"
                  >
                    Add new
                  </div>
                </td>
              </tr>

            
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Vendors;
