import { Link } from "react-router-dom";
import axios from "axios";
import { PurchaseContext } from "../contexts/purchase.context";
import React, { useEffect, useState, useContext } from "react";

function PurchaseTicket(props) {
  console.log(props);
  const { purchaseInfo } = useContext(PurchaseContext);
  console.log(purchaseInfo);

  return (
    <div className="card">
      {<p>{JSON.stringify(purchaseInfo)}</p>}
      <h1>Purchase ticket </h1>

      {/*  */}
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default PurchaseTicket;
