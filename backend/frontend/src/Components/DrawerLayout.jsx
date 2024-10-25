import React from 'react';
import { Link } from 'react-router-dom';

const DrawerLayout = ({ children }) => {
  return (
    <div className="drawer drawer-mobile">
      {/* Toggle button for mobile view */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content">
        <label 
          htmlFor="my-drawer" 
          className="btn btn-primary drawer-button lg:hidden m-4"
        >
          Open Drawer
        </label>
        {/* Child components (like Left and Right parts) */}
        {children}
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><a href="#">Sidebar Item 1</a></li>
          <li><a href="#">Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerLayout;





