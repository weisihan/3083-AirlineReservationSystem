import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// async function getUser() {
//   const resBody = await axios.post("http://localhost:3001/staffhome");
//   const res = Boolean(resBody.data);
//   if (res === false) {
//     console.log(res);
//     alert("you are not logged in");
//     return false;
//   }
//   return true;
// }

function StaffHome() {
  let navigate = useNavigate();
  if (localStorage.getItem("loggedIn") === "false") {
    console.log("not logged in!");
    alert("you are not logged in");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Return to home</button>
      </Link>
    );
  }

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
        <Link to="/mostfrequent">
          <button className="btn">View Most Frequent Customer</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/toparrivals">
          <button className="btn">View Top Destinations</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/viewreport">
          <button className="btn">View report</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/showrevenue">
          <button className="btn">Show Revene of Last Year</button>
        </Link>
        <Link to="/showrevenuemonth">
          <button className="btn">Show Revene of Last Month</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/showrevenueeconomy">
          <button className="btn">Show Total Revene of Economy Class</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/showrevenuebusiness">
          <button className="btn">Show Total Revene of Business Class</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/logout">
          <button className="btn--alt">Logout </button>
        </Link>
      </div>
    </div>
  );
}
export default StaffHome;
