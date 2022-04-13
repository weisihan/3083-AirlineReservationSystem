import { useState } from "react";
import LoginForm from "./LoginForm";

function Welcome(props) {

  return (
    <div>
      <div className="card">
        <h1>Welcome!</h1>
        <h2>{'Please sign in or register'} </h2>
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
