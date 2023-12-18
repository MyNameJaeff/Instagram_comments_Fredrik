import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./modules/Navbar";
import App from "./App";
import Login from "./modules/Login";
import Register from "./modules/Register";
import Logout from "./modules/Logout";
import CreatePost from "./modules/CreatePost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  </BrowserRouter>
);
