import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Home from "../Router/Home/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user.context";

function StaffLog(props) {
  // get curr logedin staff info (company)
  const { metaData, setMetaData } = useContext(UserContext);
  // -------------

  let navigate = useNavigate();

  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  async function LoggedIn() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    const resBody = await axios.post(
      "http://localhost:3001/stafflogin",
      details
    );
    const res = resBody.data;
    if (res) {

      console.log("you are logged in");

      navigate("/staffhome");
    } else {
      alert("wrong username or password");
    }
  }

  return (
    <div className="card">
      <div className="actions">
        <h2>Logging in as a staff</h2>
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
          <label htmlFor="username"> Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
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
        <button className="btn" onClick={LoggedIn}>
          {" "}
          Login{" "}
        </button>

        <Link to="/home">
          <button className="btn" onClick={Home}>
            {" "}
            Go back to homepage{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default StaffLog;
