import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StaffReg(props) {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    birth: "",
    airline_name: "",
  });

  async function Registered() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    // const data = await axios.get("http://localhost:3001/", details);
    // for (const item in data.data.staff) {
    //   if (data.data.staff[item].username === details.username) {
    //     alert("username already exists");
    //     return;
    //   }
    // }

    const res = await axios.post("http://localhost:3001/newstaff", details);
    console.log(res); // backend stuff to be done

    alert("Welcome!");
    //push data to database
    navigate("/login");
  }
  return (
    <div className="card">
      <div className="actions">
        <h2>Registering as a staff</h2>
        <div className="form-inner">
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
        <div className="form-group">
          <label htmlFor="first_name"> First Name: </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            onChange={(e) =>
              setDetails({ ...details, first_name: e.target.value })
            }
            value={details.first_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name"> Last Name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={(e) =>
              setDetails({ ...details, last_name: e.target.value })
            }
            value={details.last_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birth"> Birthday: </label>
          <input
            type="text"
            name="birth"
            id="birth"
            onChange={(e) => setDetails({ ...details, birth: e.target.value })}
            value={details.birth}
          />
        </div>
        <div className="form-group">
          <label htmlFor="airline_name"> Company: </label>
          <input
            type="text"
            name="airline_name"
            id="airline_name"
            onChange={(e) =>
              setDetails({ ...details, airline_name: e.target.value })
            }
            value={details.airline_name}
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

export default StaffReg;
