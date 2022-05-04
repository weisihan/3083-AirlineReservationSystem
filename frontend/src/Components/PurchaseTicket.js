import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user.context";
import { PurchaseContext } from "../contexts/purchase.context";
import React, { useEffect, useState, useContext } from "react";

function PurchaseTicket(props) {
  // console.log(props);
  const { currentUser } = useContext(UserContext);
  const { purchaseInfo } = useContext(PurchaseContext);
  // console.log(purchaseInfo);
  let [purchaseForm, setPurchaseInfo] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    cardType: "",
    expDate: "",
    email: currentUser,
  });
  // Create a handle event function
  const handleEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPurchaseInfo({ ...purchaseForm, [name]: value });
  };

  function purchaseReq(purchaseInfo) {
    // console.log(purchaseInfo);
    axios.post("http://localhost:3001/clientPurchaseTicket", purchaseInfo);
  }

  return (
    <div className="card">
      {<p>{JSON.stringify(purchaseInfo)}</p>}
      {<p>{JSON.stringify(purchaseForm)}</p>}
      <h1>Purchase ticket </h1>
      <div className="form-group">
        <label> First Name </label>
        <input type="text" name="firstName" onChange={(e) => handleEvent(e)} />
      </div>
      {/* create inputs to match the purchase form */}
      <div className="form-group">
        <label> Last Name </label>
        <input type="text" name="lastName" onChange={(e) => handleEvent(e)} />
      </div>
      <div className="form-group">
        <label> Card Number </label>
        <input type="text" name="cardNumber" onChange={(e) => handleEvent(e)} />
      </div>
      <div className="form-group">
        <label> Card Type </label>
        <input type="text" name="cardType" onChange={(e) => handleEvent(e)} />
      </div>
      <div className="form-group">
        <label> Expiration Date </label>
        <input type="text" name="expDate" onChange={(e) => handleEvent(e)} />
      </div>
      <button
        className="btn"
        onClick={() => {
          purchaseReq({
            ...purchaseForm,
            ...purchaseInfo,
          });
        }}
      >
        Purchase Ticket
      </button>
      ,
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default PurchaseTicket;
