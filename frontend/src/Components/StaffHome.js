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
        <Link to="/viewflights">
          <button className="btn">View flights</button>
        </Link>
        <Link to="/newflight">
          <button className="btn">Create new flights</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/changestatus">
          <button className="btn">Change status</button>
        </Link>
        <Link to="/newairplane">
          <button className="btn">Add new airplane</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/newairport">
          <button className="btn">Add new airport</button>
        </Link>
        <Link to="/viewfeedback">
          <button className="btn">View feedback</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/viewreport">
          <button className="btn">View report</button>
        </Link>
        <Link to="/home">
          <button className="btn--alt">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default StaffHome;
