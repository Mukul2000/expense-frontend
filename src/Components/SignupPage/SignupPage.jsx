import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import '../LoginPage/LoginPage.css';

const SignupPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [warning, setWarning] = useState("");
    const history = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            history('/dashboard');
        }
    },[]);

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    async function onSubmit() {
        if (!validateEmail(email)) {
            setWarning("e-mail is invalid");
            return;
        }
        if (password.length <= 4) {
            setWarning("password must be atleast 5 characters");
            return;
        }
        if (username.length <= 2) {
            setWarning("username must be atleast 3 characters");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/users/signup', {username: username, email: email, password: password });
            alert('Account created, please login')
            history('/login')
        }
        catch (e) {
            console.log(e);
            setWarning("Something went wrong");
        }
    }

    return (
        <div className='main-wrapper'>
            <div className='details-box'>
                Sign Up!
                <div className='input-field'>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <div className='input-field'>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='username'
                    />
                </div>
                <div className='input-field'>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </div>
                <div className='warning'>
                    {warning}
                </div>
                <Button onClick={onSubmit}> Sign up </Button>
            </div>
        </div>
    );
}

export default SignupPage;
