import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "./Table.component";

function ViewFeedback() {
  let navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState({
    flight_num: "",
    dept_date: "",
    dept_time: "",
    airline_name: "",
  });
  const [feedbackResult, setFeedbackResult] = useState([]);

  async function View() {
    for (const item in feedbackData) {
      if (feedbackData[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    let res = await axios.post(
      "http://localhost:3001/viewfeedback",
      feedbackData
    );
    res = res.data;
    console.log(res);
    alert("Successful");
    let result = [];

    for (let i = 0; i < res.length; i++) {
      let temp = [res[i].comment, res[i].rating];
      result.push(temp);
    }
    console.log(result);
    //navigate("/feedback");
    setFeedbackResult(result);
  }
  let heading = ["comment", "rating"];

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
        <button className="btn" onClick={() => View()}>
          {""}
          View
          {""}
        </button>
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
      <br></br>
      <div>Comment and Rating: </div>
      <br></br>
      {/* <div>{feedbackResult}</div> */}
      <Table heading={heading} body={feedbackResult} />
    </div>
  );
}

export default ViewFeedback;
