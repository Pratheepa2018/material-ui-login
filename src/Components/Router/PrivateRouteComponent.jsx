import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../Layout/Authentication';

//import { isLogin } from '../utils';
const isLogin = () => Auth.isAuthenticated();
const PrivateRoute = ({component: Component, ...rest}) => {
    //alert('priveat');
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;