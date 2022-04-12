import { useState } from "react";

import LoginForm from "./LoginForm";

function Welcome(props) {

  return (
    <div>
      <div className="card">
        <h2>{props.text} </h2>
        <div className="actions">
          <div className="App">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
