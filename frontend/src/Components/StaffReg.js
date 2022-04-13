import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function StaffReg(props) {
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  async function Registered() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    // const res = await axios.post("http://localhost:3000/userlogin", details);
    // console.log(res); // backend stuff to be done
    // navigate("/clienthome");
  }

  return (
    <div className="card">
      <div className="actions">
        <h2>Registering as a staff</h2>
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
        <Link to="/login">
          <button className="btn" onClick={LoginForm}>
            {" "}
            Go back to login{" "}
          </button>
        </Link>
        <button className="btn" onClick={Registered}>
          {" "}
          Register{" "}
        </button>
      </div>
    </div>
  );
}

export default StaffReg;
