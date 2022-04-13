import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NewAirport() {
  return (
    <div className="card">
      <h1>Add new airport </h1>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default NewAirport;
