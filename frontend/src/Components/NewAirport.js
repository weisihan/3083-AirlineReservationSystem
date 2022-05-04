import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewFlight() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    airport_code: "",
    airport_name: "",
    city: "",
  });

  async function Added() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    // const data = await axios.get("http://localhost:3001/", details);
    // for (const item in data.data.airport) {
    //   if (data.data.airport[item].code === details.code) {
    //     alert("Airport already exists");
    //     return;
    //   }
    // }

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
            <label htmlFor="airport_code"> Airport Code: </label>
            <input
              type="text"
              name="airport_code"
              id="airport_code"
              onChange={(e) =>
                setDetails({ ...details, airport_code: e.target.value })
              }
              value={details.airport_code}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="airport_name"> Airport Name: </label>
          <input
            type="text"
            name="airport_name"
            id="airport_name"
            onChange={(e) =>
              setDetails({ ...details, airport_name: e.target.value })
            }
            value={details.airport_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city"> City: </label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            value={details.city}
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
