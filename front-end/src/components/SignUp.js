import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            Navigate('/')
        }
    })

    const colletData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
      

        localStorage.setItem('user', JSON.stringify(result.result));
       

        if (result) {
            Navigate('/')
        }
    };

    return (
        <div className="Register">
            <h1>Register</h1>

            <input className="inputBox" type="text" value={name}
                onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />

            <input className="inputBox" type="text" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />

            <input className="inputBox" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />

            <button onClick={colletData} className="RegisterBtn" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp