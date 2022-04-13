import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewFlights() {
  return (
    <div className="card">
      <h1>View flights </h1>
      <h2>Displaying flights</h2>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewFlights;
