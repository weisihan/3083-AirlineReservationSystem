import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewAirplane() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    airplane_id: "",
    airline_name: "",
    seat_amt: "",
  });

  async function Added() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    const res = await axios.post("http://localhost:3001/newairplane", details);
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
            <label htmlFor="airplane_id"> Airplane ID: </label>
            <input
              type="text"
              name="airplane_id"
              id="airplane_id"
              onChange={(e) =>
                setDetails({ ...details, airplane_id: e.target.value })
              }
              value={details.airplane_id}
            />
          </div>
        </div>
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
        <div className="form-group">
          <label htmlFor="seat_amt"> Seat Amount: </label>
          <input
            type="text"
            name="seat_amt"
            id="seat_amt"
            onChange={(e) =>
              setDetails({ ...details, seat_amt: e.target.value })
            }
            value={details.seat_amt}
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

export default NewAirplane;
