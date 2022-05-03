import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fontWeight } from "@mui/system";

// console.log(json, 'the json obj');
// console.log("A",json.flight);
// for(let i=0;i<json.flight.length; i++){
//   console.log("here",json.flight[i].arrivalDate);
// }
// console.log('what',json.flight[1].passenger);

function MyFlights() {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    cancel: "",
  });
  async function cancelFlight() {
    let cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.style.display = "inline";
    let cancelForm = document.getElementById("cancelForm");
    cancelForm.style.display = "inline";
  }
  async function confirmCancel() {
    console.log("cancel front");
    const newUserEmail = await axios.post(
      "http://localhost:3001/clientFlightBack",
      details
    );
    console.log("cancel another");
    details.email = newUserEmail.data;
    // console.log(newUserEmail.data);
    const cancelFlight = await axios.post(
      "http://localhost:3001/cancelFlight",
      details
    );
    console.log("aaa");
    let warning = document.getElementById("warning");

    warning.innerHTML = "";
    console.log("Olivia Cancel", cancelFlight.data);
    if (cancelFlight.data == "fail") {
      warning.innerHTML +=
        "You did not purchase this flight! You can not cancel";
    } else {
      warning.innerHTML += "You Sucessfully Cancelled the Flight!";
    }
  }
  async function flight() {
    const currUser = await axios.post("http://localhost:3001/clientFlightBack");
    // console.log(1);
    let userEmail = currUser.data;
    console.log("currUser", currUser.data);
    // const res = resBody.data;
    // console.log("resNew",res);
    let clientFlight = document.getElementById("futureFlight");
    clientFlight.innerHTML = "";
    clientFlight.innerHTML += "Your Future Flight: <br>";
    details.email = userEmail;
    const sendInfo = await axios.post("http://localhost:3001/displayFlight");
    let flightInfo = sendInfo.data;
    console.log("flight", flightInfo);
    for (let i = 0; i < flightInfo.length; i++) {
      //get the email from database first
      // console.log("pass",json.flight[0].passenger)
      for (
        let tmpItem = 0;
        tmpItem < flightInfo[i].passenger.length;
        tmpItem++
      ) {
        // console.log("tmpEmail",data.data.client[j].email);
        if (flightInfo[i].passenger[tmpItem] == userEmail) {
          clientFlight.innerHTML +=
            "Arrival Date: " + flightInfo[i].arrivalDate + "<br>";
          clientFlight.innerHTML +=
            "Arrival Airport: " + flightInfo[i].arriveairport + "<br>";
          clientFlight.innerHTML +=
            "Departure Date: " + flightInfo[i].departureDate + "<br>";
          clientFlight.innerHTML +=
            "Departure Airport: " + flightInfo[i].departairport + "<br>";
          clientFlight.innerHTML +=
            "Flight Number: " + flightInfo[i].flightnum + "<br>";
          clientFlight.innerHTML +=
            "Airline Company: " + flightInfo[i].company + "<br>";
        }
      }
    }
    // alert("Email already exists");
    return;
    //   }
    // }
  }
  flight();

  return (
    <div className="card">
      <h1>My flights </h1>
      <div id="warning" style={{ color: "red", fontWeight: "bold" }}></div>
      <h2>Displaying all flights of the user</h2>
      <div id="futureFlight"></div>
      <div id="cancelForm" style={{ display: "none", fontWeight: "bold" }}>
        <div className="form-group">
          <label htmlFor="cancel">
            {" "}
            Cancel Your Flight (Enter Flight Number):
          </label>
          <input
            type="text"
            cancel="cancel"
            id="cancel"
            onChange={(e) => setDetails({ ...details, cancel: e.target.value })}
            value={details.cancel}
          />
        </div>
      </div>
      <br></br>
      <button
        className="btn"
        id="cancelBtn"
        style={{ display: "none" }}
        onClick={confirmCancel}
      >
        {" "}
        Confirm Cancel{" "}
      </button>
      <br></br>
      <br></br>
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
      <br></br>
      <button className="btn" onClick={cancelFlight}>
        {" "}
        Cancel Flight{" "}
      </button>
    </div>
  );
}

export default MyFlights;
