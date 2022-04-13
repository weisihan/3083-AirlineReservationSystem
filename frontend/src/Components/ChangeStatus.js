import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ChangeStatus() {
  return (
    <div className="card">
      <h1>Change status </h1>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ChangeStatus;
