import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user.context";
import Table from "./Table.component";

function Cancel() {
  const { currentUser } = useContext(UserContext);
  const [formDetails, setDetails] = useState({
    ticketId: "",
    airlineName: "",
    flightNum: "",
    depDate: "",
    depTime: "",
    email: currentUser,
  });

  async function sendRequest(formDetails) {
    let res = await axios.post(
      "http://localhost:3001/clientcancel",
      formDetails
    );
  }
  async function getId(formDetails) {
    let res = await axios.post("http://localhost:3001/ticketInfo", formDetails);
    // console.log("ticket", res);
    res = res.data;
    console.log("ticketdata", res);
    let aggregated = [];
    for (let i = 0; i < res.length; i++) {
      //   console.log(res[i].ticketId);
      console.log(res[i].ticket_id);
      aggregated.push([res[i].email, res[i].ticket_id]);
    }
    console.log("agg", aggregated);
    //here
    setFlights(aggregated);
  }
  function handleEvent(event) {
    console.log("targetname", event.target.name);
    setDetails({ ...formDetails, [event.target.name]: event.target.value });
    console.log(formDetails);
  }
  const [foundFlights, setFlights] = useState([]);
  let heading = ["Your Email", "Your Ticket Ids"];

  return (
    <div className="card">
      <h1>Cancel Flight </h1>
      <button className="btn" onClick={() => getId(formDetails)}>
        {" "}
        Display Your Ticket IDs{" "}
      </button>
      <Table heading={heading} body={foundFlights} />
      <div className="form-group">
        <label> Ticket Id </label>
        <input type="text" name="ticketId" onChange={(e) => handleEvent(e)} />
      </div>
      <div className="form-group">
        <label> Airline Name </label>
        <input
          type="text"
          name="airlineName"
          onChange={(e) => handleEvent(e)}
        />
      </div>

      <div className="form-group">
        <label> Departure Date </label>
        <input type="text" name="depDate" onChange={(e) => handleEvent(e)} />
      </div>
      <div className="form-group">
        {/* : : */}
        <label> Departure Time </label>
        <input type="text" name="depTime" onChange={(e) => handleEvent(e)} />
      </div>

      <div className="form-group">
        <label> Flight Number </label>
        <input type="text" name="flightNum" onChange={(e) => handleEvent(e)} />
      </div>

      <button className="btn" onClick={() => sendRequest(formDetails)}>
        {" "}
        Confirm Cancel{" "}
      </button>
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
