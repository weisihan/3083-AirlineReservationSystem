import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../../Components/LoginForm";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="card">
            <h1>Homepage </h1>
            <h2>Welcome to xxx airlines</h2>
            <div>
                <Link to="/login">
                    <button className="btn" onClick={LoginForm}>
                        {" "}
                        Go to login page{" "}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home; 