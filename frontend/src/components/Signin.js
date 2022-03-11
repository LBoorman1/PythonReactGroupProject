import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { setAxiosAuthToken, setToken, setCurrentUser, unsetCurrentUser } from "./LoginComponents/LoginActions.js";

const Signin = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handle_username = e => {
        setUsername(e.target.value)
    }
    const handle_password = e => {
        setPassword(e.target.value)
    }

    const handle_submit = e =>{
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        };
        console.log(userData);
        axios
        .post("http://localhost:8000/login/", userData)
        .then(response => {
            const { user, token } = response.data;
            console.log(user,token);
            setAxiosAuthToken(token);
            setToken(token);
            setCurrentUser(user);
        })
        .catch(error => {
            unsetCurrentUser();
        });
        if (localStorage.getItem('token') !== null) {
            return <Redirect to = '/MyDetails' push/>
        }
    };

    return (
        <div className="signin sec__one">
            <h1>Sign In</h1>
            <form onSubmit={handle_submit}>
                <p>
                <label>Username </label>
                <input
                type = "text"
                name="username"
                value = {username}
                onChange ={handle_username}/>
                </p><p>
                <label>Password </label>
                <input
                type = "password"
                name = "password"
                value = {password}
                onChange ={handle_password}/>
                </p><p>
                <input type = "submit" value = "Log in"/></p>
            </form>
        </div>
    )
    
}

export default Signin;