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
        <Link to="/">
          <button className="btn" onClick={Home}>
            Homepage{" "}
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default ClientHome;
