import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ClientReg(props) {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  async function Registered() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    const data = await axios.get("http://localhost:3000/", details);
    for (const item in data.data.client) {
      if (data.data.client[item].email === details.email) {
        alert("Email already exists");
        return;
      }
    }

    const res = await axios.post("http://localhost:3000/newclient", details);
    console.log(res); // backend stuff to be done
    alert("Welcome!");
    //push data to database
    navigate("/login");
  }
  return (
    <div className="card">
      <div className="actions">
        <h2>Registering as a client</h2>
        <div className="form-inner">
          <div className="form-group">
            <label htmlFor="fname"> First Name: </label>
            <input
              type="text"
              name="fname"
              id="fname"
              onChange={(e) =>
                setDetails({ ...details, fname: e.target.value })
              }
              value={details.fname}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="lname"> Last Name: </label>
          <input
            type="text"
            name="lname"
            id="lname"
            onChange={(e) => setDetails({ ...details, lname: e.target.value })}
            value={details.lname}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <br></br>
        <button className="btn" onClick={Registered}>
          {" "}
          Register{" "}
        </button>
        <Link to="/home">
          <button className="btn" onClick={LoginForm}>
            {" "}
            Go back to homepage{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ClientReg;
