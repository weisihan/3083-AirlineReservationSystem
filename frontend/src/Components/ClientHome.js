import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// async function getUser() {
//   const resBody = await axios.post("http://localhost:3001/clienthome");
//   const res = resBody.data;
//   if (!res) {
//     alert("you are not logged in");
//     return false;
//   }
// }

function ClientHome() {
  let navigate = useNavigate();

  if (localStorage.getItem("loggedIn") === "false") {
    console.log("not logged in!");
    alert("you are not logged in");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Go back to Home</button>
      </Link>
    );
  }

  return (
    <div className="card">
      <h1>Client Homepage </h1>
      <h2>Welcome to client homepage</h2>
      <div className="actions">
        <Link to="/myflights">
          <button className="btn">View my flights/Reivew Flights</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/searchflights">
          <button className="btn">Search for flights/Purchase Flights</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/cancel">
          <button className="btn">Cancel Flight</button>
        </Link>
        <Link to="/trackspending">
          <button className="btn">Track spending</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/logout">
          <button className="btn--alt"> Logout </button>
        </Link>
      </div>
    </div>
  );
}

export default ClientHome;
