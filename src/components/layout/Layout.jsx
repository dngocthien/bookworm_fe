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
            <Link className="link" to="/">
              Home
            </Link>
          </p>
          <p></p>
          <Link className="link" to="/shop">
            Shop
          </Link>
          <p></p>
          <Link className="link" to="/about">
            About
          </Link>
          <p>
            <Link className="link" to="/">
              Cart
            </Link>
          </p>
          <p>
            <Link className="link" to="/">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Outlet />
      <br />

      <div className="footer">
        <img src={logo} />
        <div>
          <h2>BOOKWORM</h2>
          <p>Address: District 10, HCM</p>
          <p>Phone: 0347145232</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
