import React, { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import Greeting from "./Greeting";
import Email from "./Email";
import Register from "./Register"

function LoginForm() {
  const [showModal, setModal] = useState(false);
  const [showGreeting, setGreeting] = useState(false);
  const [showEmail, setEmail] = useState(false);
  const [details, setDetails] = useState({fname: "", lname: "", email: "", password: "" });
  const [showRegister, setRegister] = useState(false);

  

  function NewRegister() {
    setRegister(true); 
  }

  function Signin() {
    setGreeting(true);
  }

  function CancelModal() {
    setModal(false);
  }

  function CancelGreeting() {
    setGreeting(false);
  }

  function CancelRegister() {
    setRegister(false);
  }

  function CancelEmail() {
    setEmail(false);
  }


  return (
      <div className="form-inner">
      <div className="form-group">
          <label htmlFor="fname"> First Name: </label>
          <input
            type="text"
            name="fname"
            id="fname"
            onChange={(e) => setDetails({ ...details, fname: e.target.value })
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
            onChange={(e) => setDetails({ ...details, lname: e.target.value })
            }
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
            onChange={(e) => setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <br></br>
        <div>
          <button className="btn" onClick={Signin}>
            {" "}
            Sign in{" "}
          </button>
          <button className="btn" onClick={NewRegister}>
            {" "}
            Register{" "}
          </button>
        </div>
        {showModal && <Modal onCancel={CancelModal} />}
        {showModal && <Backdrop onCancel={CancelModal} />}
        {showGreeting && (
          <Greeting text={details.fname} onCancel={CancelGreeting} />
        )}
        {showGreeting && <Backdrop onCancel={CancelGreeting} />}
        {showRegister && (
          <Register text={details.fname} onCancel={CancelRegister} />
        )}
        {showRegister && <Backdrop onCancel={CancelRegister} />}
        {showEmail && <Email onCancel={CancelEmail} />}
        {showEmail && <Backdrop onCancel={CancelEmail} />}
        
      </div>
  );
}

export default LoginForm;
