import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Home from "../Router/Home/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user.context";

function ChangeStatus() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    flight_num: "",
    airline_name: "",
    dept_date: "",
    dept_time: "",
  });

  async function Change() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    let res = await axios.post("http://localhost:3001/changestatus", details);
    res = res.data;
    alert("The status has " + res);
    console.log(res);
  }

  return (
    <div className="card">
      {/* {<p>{JSON.stringify(details)}</p>} */}
      <h1>Change status </h1>
      <div className="actions">
        <div className="form-group">
          <label htmlFor="flight_num"> Flight Number: </label>
          <input
            type="text"
            name="flight_num"
            id="flight_num"
            onChange={(e) => setDetails({ ...details, flight_num: e.target.value })}
            value={details.flight_num}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="airline_name"> Airline Name: </label>
          <input
            type="text"
            name="airline_name"
            id="airline_name"
            onChange={(e) =>
              setDetails({ ...details, airline_name: e.target.value })
            }
            value={details.airline_name}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="dept_date"> Depature Date: </label>
          <input
            type="text"
            name="dept_date"
            id="dept_date"
            onChange={(e) => setDetails({ ...details, dept_date: e.target.value })}
            value={details.dept_date}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="dept_time"> Depature Time: </label>
          <input
            type="text"
            name="dept_time"
            id="dept_time"
            onChange={(e) =>
              setDetails({ ...details, dept_time: e.target.value })
            }
            value={details.dept_time}
          />
        </div>
        <br></br>
        <button className="btn" onClick={Change}>
          {""}
          Change Status
          {""}
        </button>
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ChangeStatus;
