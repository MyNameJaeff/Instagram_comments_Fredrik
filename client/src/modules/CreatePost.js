import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const initialFormData = {
    header: "",
    content: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(JSON.parse(localStorage.getItem("user")));
      formData.authorId = JSON.parse(localStorage.getItem("user")).userId;
      console.log(formData);
      await axios.post("http://localhost:3001/createPost", formData);

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
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="header">Header</label>
          <input
            type="text"
            className="form-control"
            name="header"
            id="header"
            placeholder="Enter Header"
            value={formData.header}
            onInput={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Post Content</label>
          <input
            type="text"
            name="content"
            className="form-control"
            id="content"
            placeholder="Enter content"
            value={formData.content}
            onInput={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image link</label>
          <input
            type="text"
            name="image"
            className="form-control"
            id="image"
            placeholder="Image link"
            value={formData.image}
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
