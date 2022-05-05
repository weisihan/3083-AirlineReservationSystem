import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewFeedback() {
  let navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState({
    flight_num: "",
    dept_date: "",
    dept_time: "",
    airline_name: "",
  });

  if (localStorage.getItem("loggedIn") === "false") {
    console.log("not logged in!");
    alert("you are not logged in");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Go back to Home</button>
      </Link>
    );
  }
  async function View() {
    for (const item in feedbackData) {
      if (feedbackData[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    const res = await axios.post(
      "http://localhost:3001/viewfeedback",
      feedbackData
    );
    console.log(res);
    alert("Successful");
    navigate("/feedback");
  }

  return (
    <div className="card">
      <h1>View feedback </h1>

      <div className="form-inner">
        <div className="form-group">
          <label htmlFor="flight_num"> Flight Number: </label>
          <input
            type="text"
            name="flight_num"
            id="flight_num"
            onChange={(e) =>
              setFeedbackData({ ...feedbackData, flight_num: e.target.value })
            }
            value={feedbackData.flight_num}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="dept_date"> Departure Date: </label>
        <input
          type="text"
          name="dept_date"
          id="dept_date"
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, dept_date: e.target.value })
          }
          value={feedbackData.dept_date}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dept_time"> Departure Time: </label>
        <input
          type="text"
          name="dept_time"
          id="dept_time"
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, dept_time: e.target.value })
          }
          value={feedbackData.dept_time}
        />
      </div>
      <div className="form-group">
        <label htmlFor="airline_name"> Airline Name: </label>
        <input
          type="text"
          name="airline_name"
          id="airline_name"
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, airline_name: e.target.value })
          }
          value={feedbackData.airline_name}
        />
      </div>
      <br></br>
      <div className="actions">
        <button className="btn" onClick={View}>
          {""}
          View
          {""}
        </button>
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewFeedback;
