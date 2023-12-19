import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [usr, setUsr] = useState({
    name: "",
    password: "",
    email: "",
    passwordCheck: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (usr.password !== usr.passwordCheck) {
        alert("Passwords do not match!");
        return;
      }
      await axios.post("/register", usr);
      navigate("/");
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="exampleInputUsername1"
            placeholder="Enter Username"
            onInput={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            onInput={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onInput={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password Check</label>
          <input
            type="password"
            name="passwordCheck"
            className="form-control"
            id="passwordCheck"
            placeholder="Password (again)"
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

export default Register;
