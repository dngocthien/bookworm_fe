import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const [existed, setExisted] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    // const formData = new URLSearchParams();
    // formData.append("username", username);
    // formData.append("password", password);
    // fetch(DB_URL + "login", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: formData,
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw Error(res.status);
    //   })
    //   .then((result) => {
    //     // localStorage.setItem("access_token", result.access_token);
    //     dispatch({ type: "LOGIN", token: result.access_token });
    //   })
    //   .catch((error) => {
    //     alert("Login failed!");
    //   });
  }
  return (
    <>
      <div className="login-background" />

      {existed ? (
        <div className="login">
          <img src={logo} />
          <input
            value={username}
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
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
            value={username}
            placeholder="First name"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            value={username}
            placeholder="Last name"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            value={username}
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="btn-login" onClick={() => login()}>
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

export default Login;
