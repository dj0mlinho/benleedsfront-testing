import React ,  {Component} from "react";

import { Link, NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {connect } from "react-redux" ;
import { logout } from "../../../../store/actions/allActions"



import styles from "./NavigationAdmin.module.css";

export class NavigationAdmin extends Component {
  
  render() {


    return (
      <header className={styles.Header}>
       
        <div>
          <NavLink  to="/" className={styles.LogoColor}>
            Homepage
          </NavLink>
        </div>
  
        <nav className={styles.Nav}>
          <NavLink 
          exact
          activeStyle={{ color : "#ffff74" }} 
          className="" 
          to="/">
          Reports
          </NavLink>
  
          <NavLink 
            
            activeStyle={{ color : "#ffff74" }}
            className="" to="/users">
            Users
          </NavLink>
  
          <NavLink 
           
            activeStyle={{ color : "#ffff74" }}
            className="" to="/vendors">
            Vendors
          </NavLink>
  
          <NavLink 
           
            activeStyle={{ color : "#ffff74" }} 
            className="" to="/items">
            Items
          </NavLink>
  
          <NavLink  onClick={this.props.onLogout} className="" to="/">
            Log Out
          </NavLink>
        </nav>
      </header>
    );

  }

  
}


// const mapStateToProps = state => {
//   return {
//     logout : state.logout
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onLogout : () => dispatch(logout()) 
  }
}



export default connect(null,mapDispatchToProps)(NavigationAdmin);
