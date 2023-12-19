import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [post, setPost] = useState({
    header: "",
    content: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("/post", post);
      navigator("/");
    } catch (err) {
      alert(err.message);
    }
  };
  const navigator = useNavigate();
  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
