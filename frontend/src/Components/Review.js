import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user.context";

function Review() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  const [formDetails, setDetails] = useState({
    airlineName: "",
    flightNum: "",
    rating: "",
    comment: "",
    depDate: "",
    depTime: "",
    currentUser,
  });

  async function sendRequest(formDetails) {
    let res = await axios.post(
      "http://localhost:3001/clientReviewBack",
      formDetails
    );
  }
  function handleEvent(event) {
    console.log("targetname", event.target.name);
    setDetails({ ...formDetails, [event.target.name]: event.target.value }); //happening in the background
    console.log(formDetails);
  }
  return (
    <div className="card">
      <h1>Review </h1>
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
      <div className="form-group">
        <label> Rating </label>
        <input type="text" name="rating" onChange={(e) => handleEvent(e)} />
      </div>
      <div className="form-group">
        <label> Comment </label>
        <input type="text" name="comment" onChange={(e) => handleEvent(e)} />
      </div>
      <button className="btn" onClick={() => sendRequest(formDetails)}>
        {" "}
        Submit Review{" "}
      </button>
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default Review;
