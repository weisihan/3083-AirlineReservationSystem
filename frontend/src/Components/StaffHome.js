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
  const [details, setDetails] = useState({
    status: "",
  });

  async function getStatus() {
    const resBody = await axios.post("http://localhost:3001/staffcheck");
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
        <Link to="/logout">
          <button className="btn--alt">Logout </button>
        </Link>
      </div>
    </div>
  );
}
export default StaffHome;
