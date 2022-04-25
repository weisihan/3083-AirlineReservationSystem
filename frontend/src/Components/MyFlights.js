import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyFlights() {
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  // get client's email

  // const data = await axios.get("http://localhost:3001/", details);
  // for (const item in data.data.flight) {
  //   for (const email in data.data.flight[item].passenger) {
  //     if (email === details.email) {
  //       // display the flight details
  //     }
  //       return;
  //     }
  //   }

  return (
    <div className="card">
      <h1>My flights </h1>
      <h2>Displaying all flights of the user</h2>
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default MyFlights;
