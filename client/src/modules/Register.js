import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const initialFormData = {
    name: "",
    password: "",
    email: "",
    passwordCheck: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.passwordCheck) {
        alert("Passwords do not match!");
        return;
      }

      // Send POST request
      await axios.post("http://localhost:3001/register", formData);

      console.log("HTTP req successful", formData);

      setFormData(initialFormData);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            value={formData.name}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.passwordCheck}
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
