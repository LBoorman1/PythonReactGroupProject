import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { setCurrentUser } from '../LoginComponents/LoginActions';

class PrivateRoute extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isAuthenticated: false
        };

        const response = axios.get(`http://localhost:8000/currentuser/?token=${localStorage.getItem('token')}`)
            .then(response => {
                if (Object.keys(response.data).length !== 0) {
                    this.setState(() => ({ isLoading: false, isAuthenticated: true }));
                    setCurrentUser(response.data);
                } else {
                    this.setState(() => ({ isLoading: false, isAuthenticated: false }));
                }
            });

    }

    render() {
        if (this.state.isLoading) {
            // Temporary while waiting for API call
            return <div>Loading...</div>;
        } else if (!this.state.isAuthenticated) {
            // Not logged in so redirect to sign in page
            return <Redirect to={{ pathname: '/Signin' }} />
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            // Check if route is restricted by role
            if (this.props.roles) {
                if (this.props.roles.indexOf('Admin') !== -1 && !user.is_admin
                    || this.props.roles.indexOf('Mentor') !== -1 && !user.is_mentor
                    || this.props.roles.indexOf('Mentee') !== -1 && !user.is_mentee) {
                    // Role not authorised so redirect to home page
                    return <Redirect to={{ pathname: '/MyDetails' }} />
                }
            }
            // Authorised so return component
            const Component = this.props.component
            return <Component {...this.props} />
        }
    }

}

export default PrivateRoute;
