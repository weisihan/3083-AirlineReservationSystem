import React, { useState } from "react";

function Register(props) {
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  return (
    <div className="card">
      <h2>Choose to register as a client or staff</h2>
    </div>
  );
}

export default Register;
