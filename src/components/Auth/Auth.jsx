import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { DB_URL } from "../../constants";
import "./Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const [existed, setExisted] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRePassword("");
  }, [existed]);

  function signup() {
    const user = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      admin: false,
    };
    fetch(DB_URL + "users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      alert("Your account was created!");
      setExisted(true);
    });
  }

  function login() {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);
    fetch(DB_URL + "login", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.status);
      })
      .then((result) => {
        localStorage.setItem("access_token", result.access_token);
        dispatch({ type: "MAIL", email: result.email });
        dispatch({ type: "AUTH", auth: false });
      })
      .catch((error) => {
        alert("Login failed!");
      });
  }
  return (
    <>
      <div className="login-background">
        <button
          className="btn-cancel"
          onClick={() => dispatch({ type: "AUTH", auth: false })}
        >
          X
        </button>
      </div>

      {existed ? (
        <div className="login">
          <img src={logo} />
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="btn-login" onClick={() => login()}>
            Login
          </button>
          <p className="txt-link" onClick={() => setExisted(false)}>
            New Account
          </p>
        </div>
      ) : (
        <div className="signup">
          <img src={logo} />
          <input
            value={firstName}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            value={rePassword}
            type="password"
            placeholder="Retype Password"
            onChange={(e) => setRePassword(e.target.value)}
          ></input>

          <button className="btn-login" onClick={() => signup()}>
            Create
          </button>
          <p className="txt-link" onClick={() => setExisted(true)}>
            Login
          </p>
        </div>
      )}
    </>
  );
};

export default Auth;
