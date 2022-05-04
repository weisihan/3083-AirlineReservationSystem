import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewFlight() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    flight_num: "",
    airline_name: "",
    dept_airport: "",
    arr_airport: "",
    dept_date: "",
    dept_time_eastern: "",
    arr_date: "",
    arr_time_eastern: "",
    airplane_id: "",
    flight_status: "",
    base_price: "",
    airplane_airline_name_in_flight: "",
  });

  async function Added() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    const res = await axios.post("http://localhost:3001/newflight", details);
    console.log(res); // backend stuff to be done
    alert("Successfully added!");
    //push data to database
    navigate("/staffhome");
  }

  return (
    <div className="card">
      <div className="actions">
        <h2>Adding a new flight</h2>
        <div className="form-inner">
          <div className="form-group">
            <label htmlFor="flight_num"> Flight Number: </label>
            <input
              type="text"
              name="flight_num"
              id="flight_num"
              onChange={(e) =>
                setDetails({ ...details, flight_num: e.target.value })
              }
              value={details.flight_num}
            />
          </div>
          <br></br>
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
          <br></br>
          <div className="form-group">
            <label htmlFor="dept_airport"> Departure Airport: </label>
            <input
              type="text"
              name="dept_airport"
              id="dept_airport"
              onChange={(e) =>
                setDetails({ ...details, dept_airport: e.target.value })
              }
              value={details.dept_airport}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="arr_airport"> Arrival Airport: </label>
          <input
            type="text"
            name="arr_airport"
            id="arr_airport"
            onChange={(e) =>
              setDetails({ ...details, arr_airport: e.target.value })
            }
            value={details.arr_airport}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="dept_date"> Departure Date: </label>
          <input
            type="text"
            name="dept_date"
            id="dept_date"
            onChange={(e) =>
              setDetails({ ...details, dept_date: e.target.value })
            }
            value={details.dept_date}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="dept_time_eastern"> Departure Time: </label>
          <input
            type="text"
            name="dept_time_eastern"
            id="dept_time_eastern"
            onChange={(e) =>
              setDetails({ ...details, dept_time_eastern: e.target.value })
            }
            value={details.dept_time_eastern}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="arr_date"> Arrival Date: </label>
          <input
            type="text"
            name="arr_date"
            id="arr_date"
            onChange={(e) =>
              setDetails({ ...details, arr_date: e.target.value })
            }
            value={details.arr_date}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="arr_time_eastern"> Arrival Time: </label>
          <input
            type="text"
            name="arr_time_eastern"
            id="arr_time_eastern"
            onChange={(e) =>
              setDetails({ ...details, arr_time_eastern: e.target.value })
            }
            value={details.arr_time_eastern}
          />
        </div>
        <br></br>
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
        <br></br>
        <div className="form-group">
          <label htmlFor="flight_status"> Flight Status: </label>
          <input
            type="text"
            name="flight_status"
            id="flight_status"
            onChange={(e) =>
              setDetails({ ...details, flight_status: e.target.value })
            }
            value={details.flight_status}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="base_price"> Base Price: </label>
          <input
            type="text"
            name="base_price"
            id="base_price"
            onChange={(e) =>
              setDetails({ ...details, base_price: e.target.value })
            }
            value={details.base_price}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="airplane_airline_name_in_flight">
            {" "}
            Airplane Name:{" "}
          </label>
          <input
            type="text"
            name="airplane_airline_name_in_flight"
            id="airplane_airline_name_in_flight"
            onChange={(e) =>
              setDetails({
                ...details,
                airplane_airline_name_in_flight: e.target.value,
              })
            }
            value={details.airplane_airline_name_in_flight}
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
