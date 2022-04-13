import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Home from "../Router/Home/Home";

function ClientHome() {
  return (
    <div className="card">
      <h1>Client Homepage </h1>
      <h2>Welcome to client homepage</h2>
      <div className="actions">
        <Link to="/myflights">
          <button className="btn">View my flights</button>
        </Link>
        <Link to="/searchflights">
          <button className="btn">Search for flights</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/purchaseticket">
          <button className="btn">Purchase ticket</button>
        </Link>
        <Link to="/review">
          <button className="btn">Review</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/trackspending">
          <button className="btn">Track spending</button>
        </Link>
        <Link to="/home">
          <button className="btn--alt">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default ClientHome;
