import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewFlight() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    code: "",
    name: "",
  });

  async function Added() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    const data = await axios.get("http://localhost:3001/", details);
    for (const item in data.data.airport) {
      if (data.data.airport[item].code === details.code) {
        alert("Airport already exists");
        return;
      }
    }

    const res = await axios.post("http://localhost:3001/newairport", details);
    console.log(res);
    alert("Successfully added");
    navigate("/staffhome");
  }

  return (
    <div className="card">
      <h1>Add new flight </h1>
      <div className="actions">
        <div className="form-inner">
          <div className="form-group">
            <label htmlFor="code"> Airport Code: </label>
            <input
              type="text"
              name="code"
              id="code"
              onChange={(e) => setDetails({ ...details, code: e.target.value })}
              value={details.code}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name"> Airport Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
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
