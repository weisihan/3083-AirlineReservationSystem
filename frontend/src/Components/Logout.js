import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Logout() {
  const resBody = axios.post("http://localhost:3001/logout");
  console.log("You have logged out");
  localStorage.setItem("loggedIn", false);

  return (
    <div className="card">
      <h2>You have logged out</h2>
      <Link to="/home">
        <button className="btn">Return to home</button>
      </Link>
    </div>
  );
}

export default Logout;
