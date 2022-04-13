import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Register(props) {
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  return (
    <div className="card">
      <h1>Registeration</h1>
      <h2>Fill in the information to register now</h2>
      <div className="actions">
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
        <Link to="/login">
          <button className="btn" onClick={LoginForm}>
            {" "}
            Go back to login{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
