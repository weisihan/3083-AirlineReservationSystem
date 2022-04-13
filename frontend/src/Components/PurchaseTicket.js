import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PurchaseTicket() {
  return (
    <div className="card">
      <h1>Purchase ticket </h1>
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default PurchaseTicket;
