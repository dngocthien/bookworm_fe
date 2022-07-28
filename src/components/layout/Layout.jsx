import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} />
          <p>BOOKWORM</p>
        </div>
        <div className="navbar-links">
          <p>
            <Link className="link" to="/home">
              Home
            </Link>
          </p>
          <p></p>
          <Link className="link" to="/home">
            Shop
          </Link>
          <p></p>
          <Link className="link" to="/home">
            About
          </Link>
          <p>
            <Link className="link" to="/home">
              Cart
            </Link>
          </p>
          <p>
            <Link className="link" to="/home">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
