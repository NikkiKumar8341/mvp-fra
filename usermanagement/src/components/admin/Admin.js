import React from 'react';
import { Link, Outlet, Route } from 'react-router-dom';
import './Sidebar.scss';
import RequireAuth from '../routing/RequiredAuth';



const Admin = () => {

  return (
    <div>
    <div className='sidebar'>
    <Link to="analytics" className="sidebar-link">
    Analytics
      </Link>
      <Link to="frList" className="sidebar-link">
        FRs List
      </Link>
      <Link to="sitesList" className="sidebar-link">
        Sites List
      </Link>
      <Link to="customer" className="sidebar-link">
        Customer
      </Link>
    </div>    
    
  </div>
  );
};

export default Admin;

