import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import axios from "axios";
import { setAxiosAuthToken, setToken, setCurrentUser, unsetCurrentUser } from "./LoginComponents/LoginActions.js";

const Signin = props => {
    //const history = useHistory();
    //window.location.reload();
    //useEffect(() => {
    //window.location.reload();
    //}, []);

    const [redirect, setRedirect] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handle_username = e => {
        setUsername(e.target.value)
    }
    const handle_password = e => {
        setPassword(e.target.value)
    }

    //if (redirect) {
    //console.log('test');
    //props.history.push('/MyDetails');
    //return <Redirect to='/MyDetails' />;
    //}

    const handle_submit = e => {
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
                setAxiosAuthToken(token);
                setToken(token);
                setCurrentUser(user);
                // Redirect and set navbar correctly
                props.history.push('/MyDetails');
                window.location.reload();
            })
            .catch(error => {
                unsetCurrentUser();
            });
        if (localStorage.getItem('token') !== null) {
            console.log('test');
            //history.push('/MyDetails');
            //return <Redirect to='/MyDetails' push />
        }
    };

    return (
        <div className="signin sec__one">
            <h1>Sign In</h1>
            <form onSubmit={e => {
                handle_submit(e);
            }}>
                <p>
                    <label>Username </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handle_username} />
                </p><p>
                    <label>Password </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handle_password} />
                </p><p>
                    <input type="submit" value="Log in" /></p>
            </form>
        </div>
    )

}

export default withRouter(Signin);