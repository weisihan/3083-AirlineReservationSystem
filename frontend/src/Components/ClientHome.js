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
  const [details, setDetails] = useState({
    status: "",
  });

  async function getStatus() {
    const resBody = await axios.post("http://localhost:3001/clientcheck");
    const res = resBody.data;
    if (res === true) {
      console.log("logged in");
      details.status = "true";
    } else {
      alert("you are not logged in");
      console.log("navigating to home");
      navigate("/home");
      details.status = "false";
    }
  }

  useEffect(() => {
    if (details.status === "") {
      getStatus();
    }
  });

  useEffect(() => {
    if (details.status === "false") {
      navigate("/home");
    }
  });

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
}

export default ClientHome;
