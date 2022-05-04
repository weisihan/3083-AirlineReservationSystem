import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewFlight() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    flightnum: "",
    departairport: "",
    arriveairport: "",
    company: "",
  });

  async function Added() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    // const data = await axios.get("http://localhost:3001/", details);
    // for (const item in data.data.flight) {
    //   if (data.data.flight[item].flightnum === details.flightnum) {
    //     alert("Flight already exists");
    //     return;
    //   }
    // }

    const res = await axios.post("http://localhost:3001/newflight", details);
    console.log(res);
    alert("Successfully added");
    navigate("/viewflights");
  }

  return (
    <div className="card">
      <h1>Add new flight </h1>
      <div className="actions">
        <div className="form-inner">
          <div className="form-group">
            <label htmlFor="flightnum"> Flight Number: </label>
            <input
              type="text"
              name="flightnum"
              id="flightnum"
              onChange={(e) =>
                setDetails({ ...details, flightnum: e.target.value })
              }
              value={details.flightnum}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="departairport"> Departure Airport: </label>
          <input
            type="text"
            name="departairport"
            id="departairport"
            onChange={(e) =>
              setDetails({ ...details, departairport: e.target.value })
            }
            value={details.departairport}
          />
        </div>
        <div className="form-group">
          <label htmlFor="arriveairport"> Arrival Airport: </label>
          <input
            type="text"
            name="arriveairport"
            id="arriveairport"
            onChange={(e) =>
              setDetails({ ...details, arriveairport: e.target.value })
            }
            value={details.arriveairport}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company"> Company: </label>
          <input
            type="text"
            name="company"
            id="company"
            onChange={(e) =>
              setDetails({ ...details, company: e.target.value })
            }
            value={details.company}
          />
        </div>
        <br></br>
        <button className="btn" onClick={Added}>
          {" "}
          Add{" "}
        </button>
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default NewFlight;
