import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "../Router/Home/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StaffLog(props) {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    staff_password: "",
  });

  async function LoggedIn() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    let resBody = await axios.post("http://localhost:3001/stafflogin", details);
    resBody = resBody.data;
    console.log(resBody);
    const setLocalStorage = resBody ? true : false;
    localStorage.setItem("loggedIn", setLocalStorage);

    if (resBody) {
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
          <label htmlFor="staff_password"> Password: </label>
          <input
            type="text"
            name="staff_password"
            id="staff_password"
            onChange={(e) =>
              setDetails({ ...details, staff_password: e.target.value })
            }
            value={details.staff_password}
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
