import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Select from "react-select";
import { setAxiosAuthToken, setToken, setCurrentUser, unsetCurrentUser } from "./LoginComponents/LoginActions.js";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business_area_options, setBusinessAreaOptions] = useState([]);
  const [business_area, setBusinessArea] = useState("");
  const [is_mentee, setIsMentee] = useState(false);

  useEffect(() => {
    get_business_area();
  }, []);

  const handle_username = e => {
    setUsername(e.target.value);
  }
  const handle_firstname = e => {
    setFirstname(e.target.value);
  }
  const handle_lastname = e => {
    setLastname(e.target.value);
  }
  const handle_email = e => {
    setEmail(e.target.value);
  }
  const handle_password = e => {
    setPassword(e.target.value);
  }
  const handle_business_area = e => {
    setBusinessArea(e.value);
  }

  const handle_is_mentee = e => {
    setIsMentee(!is_mentee);
  }

  const get_business_area = () => {
    axios
      .get("http://localhost:8000/businessareas/")
      .then(response => {
        const data = response.data;

        const options = data.map(d => ({
          "value": d.id,
          "label": d.name
        }))

        setBusinessAreaOptions(options);
      })
  }

  const handle_submit = e => {
    e.preventDefault();
    const err = false;
    const userData = {
      user: {
        username: username,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
      },
      business_area: business_area,
      is_mentee: is_mentee,
      is_mentor: false,
      is_admin: false
    };
    axios
      .post("http://localhost:8000/register/", userData)
      .then(response => {
        const { user, token } = response.data;
        setAxiosAuthToken(token);
        setToken(token);
        setCurrentUser(user);
      })
      .catch(error => {
        unsetCurrentUser();
        err = true;
      });
    if (!err) {
      return <Redirect to='/MyDetails' push />
    }
  }
  return (
    <div className="create_account sec__one">
      <h1> Create Account </h1>
      <form method="post" onSubmit={handle_submit}>
        <p>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handle_username} />
        </p><p>
          <label>First name</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={handle_firstname} />
        </p><p>
          <label>Last name</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={handle_lastname} />
        </p><p>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handle_email} />
        </p><p>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handle_password} />
        </p>
        <label> Business Area </label>
        <Select style="max-width:40%;" options={business_area_options} onChange={handle_business_area} />
        <br></br>
        <label> Would you like to sign up as a mentee? </label>
        <input type="checkbox" name="is_mentee" onChange={handle_is_mentee} />
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default CreateAccount
