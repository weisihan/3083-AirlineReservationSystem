import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyFlights() {
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
