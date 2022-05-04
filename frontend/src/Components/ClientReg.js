import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ClientReg(props) {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
    building_num: "",
    street: "",
    city: "",
    state: "",
    phone_num: "",
    passport_num: "",
    passport_exp: "",
    passport_country: "",
    birthday: "",
  });

  async function Registered() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    const res = await axios.post("http://localhost:3001/newclient", details);
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
            <label htmlFor="email"> Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <br></br>
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
          <div className="form-group">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="building_num"> Building Number: </label>
          <input
            type="number"
            name="building_num"
            id="building_num"
            onChange={(e) =>
              setDetails({ ...details, building_num: e.target.value })
            }
            value={details.building_num}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="street"> Street: </label>
          <input
            type="text"
            name="street"
            id="street"
            onChange={(e) => setDetails({ ...details, street: e.target.value })}
            value={details.street}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="city"> City: </label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            value={details.city}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="state"> State: </label>
          <input
            type="text"
            name="state"
            id="state"
            onChange={(e) => setDetails({ ...details, state: e.target.value })}
            value={details.state}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="phone_num"> Phone Number: </label>
          <input
            type="number"
            name="phone_num"
            id="phone_num"
            onChange={(e) =>
              setDetails({ ...details, phone_num: e.target.value })
            }
            value={details.phone_num}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="passport_num"> Passport Number: </label>
          <input
            type="text"
            name="passport_num"
            id="passport_num"
            onChange={(e) =>
              setDetails({ ...details, passport_num: e.target.value })
            }
            value={details.passport_num}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="passport_exp"> Passport Expiration Date: </label>
          <input
            type="text"
            name="passport_exp"
            id="passport_exp"
            onChange={(e) =>
              setDetails({ ...details, passport_exp: e.target.value })
            }
            value={details.passport_exp}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="passport_country"> Passport Country: </label>
          <input
            type="text"
            name="passport_country"
            id="passport_country"
            onChange={(e) =>
              setDetails({ ...details, passport_country: e.target.value })
            }
            value={details.passport_country}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="birthday"> Birthday: </label>
          <input
            type="text"
            name="birthday"
            id="birthday"
            onChange={(e) =>
              setDetails({ ...details, birthday: e.target.value })
            }
            value={details.birthday}
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
