import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="layout">
      <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} />
          <p>BOOKWORM</p>
        </div>
        <div className="navbar-links">
          <p>
            <Link
              className={
                location.pathname == "/" ? "link link-current" : "link"
              }
              to="/"
            >
              Home
            </Link>
          </p>
          <p></p>
          <Link
            className={
              location.pathname.includes("/shop") ? "link link-current" : "link"
            }
            to="/shop"
          >
            Shop
          </Link>
          <p></p>
          <Link
            className={
              location.pathname.includes("/about")
                ? "link link-current"
                : "link"
            }
            to="/about"
          >
            About
          </Link>
          <p>
            <Link
              className={
                location.pathname.includes("/cart")
                  ? "link link-current"
                  : "link"
              }
              to="/"
            >
              Cart
            </Link>
          </p>
          <p>
            <Link
              className={
                location.pathname.includes("/login")
                  ? "link link-current"
                  : "link"
              }
              to="/"
            >
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
