import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../Auth/Auth";
import "./Layout.css";

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector((state) => state.cart ?? []);
  const auth = useSelector((state) => state.auth);
  const username = useSelector((state) => state.email);
  const [btnLogout, setBtnLogout] = useState(false);

  const logout = () => {
    dispatch({ type: "MAIL", email: null });
    setBtnLogout(false);
  };

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
          <Link
            className={location.pathname == "/" ? "link link-current" : "link"}
            to="/"
          >
            Home
          </Link>
          <Link
            className={
              location.pathname.includes("/shop") ? "link link-current" : "link"
            }
            to="/shop"
          >
            Shop
          </Link>
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
          <Link
            className={
              location.pathname.includes("/cart") ? "link link-current" : "link"
            }
            to="/cart"
          >
            Cart ({count()})
          </Link>

          {username != null ? (
            <div>
              <p
                onClick={() =>
                  btnLogout == false ? setBtnLogout(true) : setBtnLogout(false)
                }
                className="link"
              >
                {username} &#9662;
              </p>
              {btnLogout ? (
                <button
                  className="btn-logout btn-border"
                  onClick={() => {
                    logout();
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <p
              className="link"
              onClick={() => dispatch({ type: "AUTH", auth: true })}
            >
              Sign In
            </p>
          )}
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

      {auth ? <Auth /> : <></>}
    </div>
  );
};

export default Layout;
