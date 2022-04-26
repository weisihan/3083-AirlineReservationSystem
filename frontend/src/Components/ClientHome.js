import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// async function getUser() {
//   const resBody = await axios.post("http://localhost:3001/clienthome");
//   const res = resBody.data;
//   if (!res) {
//     alert("you are not logged in");
//     return false;
//   }
// }

async function success() {}

function ClientHome() {
  const [details, setDetails] = useState({
    status: "",
  });

  async function getStatus() {
    const resBody = await axios.post("http://localhost:3001/clientcheck");
    if (resBody.data === true) {
      console.log("logged in");
      details.status = "true";
    } else {
      alert("you are not logged in");
      details.status = "false";
    }
  }
  getStatus();
  console.log("status is", details.status);

  if (details.status === "true") {
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
          <Link to="/logout">
            <button className="btn--alt"> Logout </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/home">
          <button className="btn">Return to home</button>
        </Link>
      </div>
    );
  }
}

export default ClientHome;
