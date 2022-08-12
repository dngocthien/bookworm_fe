import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import Login from "../Auth/Login";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const cart = useSelector((state) => state.cart) ?? [];
  const [login, setLogin] = useState(false);

  const count = () => {
    let sum = 0;
    cart.map((b) => {
      sum += b.quantity;
    });
    return sum;
  };
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
              to="/cart"
            >
              Cart ({count()})
            </Link>
          </p>
          <p className="link" onClick={() => setLogin(true)}>
            Sign In
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

      {login ? <Login /> : <></>}
    </div>
  );
};

export default Layout;
