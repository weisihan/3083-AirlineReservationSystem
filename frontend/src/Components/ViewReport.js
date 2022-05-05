import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewReport() {
  return (
    <div className="card">
      <h1>View report </h1>
      <br></br>
      <div className="actions">
        <Link to="/ticketsold">
          <button className="btn">View Tickets Sold Within A Year</button>
        </Link>
      </div>
      <br></br>
      <div className="actions">
        <Link to="/ticketmonth">
          <button className="btn">View Tickets Sold Within Last Month</button>
        </Link>
      </div>
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewReport;
