import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Home from "../Router/Home/Home";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  function NewRegister() {}

  async function Signin() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    // const res = await axios.post("http://localhost:3000/userlogin", details);
    // console.log(res); // backend stuff to be done
    navigate("/clienthome");
  }

  return (
    <div className="form-inner">
      <div className="form-group">
        <label htmlFor="fname"> First Name: </label>
        <input
          type="text"
          name="fname"
          id="fname"
          onChange={
            (e) => setDetails({ ...details, fname: e.target.value }) // ... = spread
          }
          value={details.fname}
        />
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
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
      </div>
      <br></br>
      <div>
        <Link to="/">
          <button className="btn" onClick={Home}>
            {" "}
            Homepage{" "}
          </button>
        </Link>
        <button className="btn" onClick={Signin}>
          {" "}
          Sign in{" "}
        </button>
        <Link to="/register">
          <button className="btn" onClick={NewRegister}>
            {" "}
            Register{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
