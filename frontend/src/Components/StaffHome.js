import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Home from "../Router/Home/Home";

function StaffHome() {
  return (
    <div className="card">
      <h1>Staff Homepage </h1>
      <h2>Welcome to staff homepage</h2>
      <div className="actions">
        <Link to="/home">
          <button className="btn" onClick={Home}>
            Homepage{" "}
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default StaffHome;
