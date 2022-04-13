import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Review() {
  return (
    <div className="card">
      <h1>Review </h1>
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default Review;
