import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar , Nav} from "react-bootstrap" ;

const AdminNavbar = props => {
  const logOut = function handleLogOut() {
    localStorage.removeItem('admin');
    this.props.history.replace(`./login`);
  };
  return (
    <div>
      <Navbar className='my-nav' collapseOnSelect expand="lg"  variant="dark">
        <Navbar.Brand>
        <Link to='/admin' className='logo-color'>
          Homepage
        </Link>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='ml-auto'>
          
            <Link className='ml-2 my-nav-link' to='/admin/users'>
              Users
            </Link>
          
          
            <Link className= 'ml-2 my-nav-link' to='/admin/vendors'>
              Vendors
            </Link>
         
         
            <Link className=' ml-2 my-nav-link' to='/admin/items'>
              Items
            </Link>
          
          
            <Link className='ml-2 my-nav-link' to='/admin/jobs'>
              Jobs
            </Link>
          
          
            <Link className='ml-2 my-nav-link' to='/admin'>
              Work Orders
            </Link>
          
          
            <Link onClick={logOut} className='ml-2 my-nav-link' to='/'>
              Log Out
            </Link>
          
        </Nav>
   
        </Navbar.Collapse>
 
      </Navbar>

      <div className='jumbotron jumbotron-fluid jumbotron-adj'>
        <div className='container'>
          <h1 className='display-4 res-h'>{props.pageName}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;



{/* <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      
    </Nav>
   
  </Navbar.Collapse>
</Navbar> */}


{/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar> */}