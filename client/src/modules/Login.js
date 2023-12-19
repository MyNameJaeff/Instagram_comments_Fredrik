import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [usr, setUsr] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("/login").then((res) => {
      const isLoggedIn = res.data.isLoggedIn;
      if (isLoggedIn) {
        navigate("/");
      } else {
        return;
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("/login", usr);
      console.log(resp);
      const loggedIn = resp.data.isLoggedIn;
      if (loggedIn) {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        navigate("/");
      } else {
        alert("Wrong email or password");
        return;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setUsr((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onInput={handleChange}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onInput={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
