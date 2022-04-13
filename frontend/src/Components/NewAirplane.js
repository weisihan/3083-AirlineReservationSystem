import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NewAirplane() {
  return (
    <div className="card">
      <h1>Add new airplane </h1>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default NewAirplane;
