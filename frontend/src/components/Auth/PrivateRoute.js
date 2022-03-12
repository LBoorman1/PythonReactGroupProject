import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            // not logged in so redirect to sign in page
            return <Redirect to={{ pathname: '/Signin' }} />
        }

        console.log(roles);

        // check if route is restricted by role
        if (roles) {
            if (roles.indexOf('Admin') !== -1 && !user.is_admin
                || roles.indexOf('Mentor') !== -1 && !user.is_mentor
                || roles.indexOf('Mentee') !== -1 && !user.is_mentee) {
                // role not authorised so redirect to home page
                console.log('test');
                return <Redirect to={{ pathname: '/MyDetails' }} />
            }
        }

        // authorised so return component
        console.log('test 2');
        return <Component {...props} />
    }} />
)