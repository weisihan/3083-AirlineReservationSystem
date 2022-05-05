import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import Table from "./Table.component";
// import {Bar} from 'react-chartjs-2';

function TrackSpending() {
  function handleEvent(event) {
    console.log("targetname", event.target.name);
    setDetails({ ...formDetails, [event.target.name]: event.target.value });
    console.log(formDetails);
  }
  const { currentUser } = useContext(UserContext);

  const [formDetails, setDetails] = useState({
    start_date: "",
    end_date: "",
    email: currentUser,
  });
  const [foundFlights, setFlights] = useState([]);
  let monthA = [];
  let nowDate = new Date();
  async function sendRequest(formDetails) {
    console.log("formdetails", formDetails);
    let res = await axios.post("http://localhost:3001/money", formDetails);
    res = res.data;
    console.log("newres", res);
    let aggregated = [];
    let start;
    let end;
    if (formDetails.start_date == "" && formDetails.end_date == "") {
      console.log("yes");
      end = nowDate.getMonth() + 1;
      start = end - 5;
      if (start <= 0) {
        if (start == 0) {
          start = 12;
        } else {
          start = 12 + start;
        }
      }
      console.log("month", start);
    } else {
      console.log("no");
      start = parseInt(formDetails.start_date.split("T")[0].split("-")[1]);
      end = parseInt(formDetails.end_date.split("T")[0].split("-")[1]);
    }
    if (start > end) {
      for (let i = start; i <= 12; i++) {
        monthA.push(i);
      }
      for (let j = 1; j <= end; j++) {
        monthA.push(j);
      }
    } else {
      for (let i = start; i <= end; i++) {
        monthA.push(i);
      }
    }

    console.log(monthA);
    console.log(res);
    for (let j = 0; j < monthA.length; j++) {
      let monthSpend = 0;
      for (let i = 0; i < res.length; i++) {
        const { purchase_date, sold_price } = res[i];
        let month = purchase_date.split("T")[0].split("-")[1];
        console.log("datamonth", month);
        if (month == monthA[j]) {
          monthSpend += sold_price;
        }
      }
      aggregated.push([monthA[j], monthSpend]);
    }
    for (let i = 0; i < aggregated.length; i++) {
      console.log("agg", aggregated[i]);
    }
    setFlights(aggregated);
  }
  let heading = ["month", "spending"];
  console.log(typeof heading);
  console.log(typeof monthA);
  return (
    <div className="card">
      <h1>Track spending</h1>
      <h3>Optional:define your own start and end date (YYYY-MM-DD)</h3>
      <div className="form-group">
        <label htmlFor="start_date"> Enter Start Date</label>
        <input
          type="text"
          name="start_date"
          id="start_date"
          onChange={(e) => handleEvent(e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="end_date"> Enter End Date</label>
        <input
          type="text"
          name="end_date"
          id="end_date"
          onChange={(e) => handleEvent(e)}
        />
      </div>
      <br></br>
      <button className="btn" onClick={() => sendRequest(formDetails)}>
        {" "}
        Track Spendng{" "}
      </button>
      <br></br>
      <br></br>
      <Table heading={heading} body={foundFlights} />
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default TrackSpending;
