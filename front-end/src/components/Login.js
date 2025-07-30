import React , { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            Navigate('/')
        }
    })


    const handleLogin = async () => {
        console.log("email", "password", email, password);
        let result = await fetch('https://back-expense-2.onrender.com/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
           
            Navigate('/')
        } else {
            alert("Please enter correct email and password");
        }
    }

    return(
        <div className="Register">
            <h1>Welcome Back</h1>
            <input className="inputBox" type="text" placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className="inputBox" type="password" placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="RegisterBtn" onClick={handleLogin}>Log in</button><br /><br />
            <a href='/signup'>Don't have a Account? Sign up</a>
        </div>
    )
}

export default Login