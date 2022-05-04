import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Home from "../Router/Home/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user.context";

function ClientLog(props) {
  const { setCurrentUser, currentUser } = useContext(UserContext);
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  async function LoggedIn() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    // let general = await axios.all([
    //   await axios.post("http://localhost:3001/clientlogin", details),
    //   await axios.post("http://localhost:3001/clientFlightBack", details),
    // ]);
    // console.log("general", general);
    // const resBody = general[0];

    // const forFlight = await axios.post(
    //   "http://localhost:3001/clientFlightBack",
    //   details
    // );
    // );

    let res = await axios.post("http://localhost:3001/clientlogin", details);
    res = res.data;
    console.log(res);
    const setLocalStorage = res ? true : false;
    localStorage.setItem("loggedIn", setLocalStorage);

    if (res) {
      console.log("you are logged in");
      console.log("a");
      setCurrentUser(details.email);
      console.log("b");
      navigate("/clienthome");
    } else {
      alert("wrong username or password");
    }
  }

  return (
    <div className="card">
      <div className="actions">
        <h2>Logging in as a client</h2>
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
        <br />
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

export default ClientLog;
