import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">UMD</div>
      <div className="header-right">
        <Link to="/" className="button view-users">View Users</Link>
        <Link to="/add-user" className="button add-user-btn">+ Add User</Link>
      </div>
    </header>
  );
};

export default Header;
