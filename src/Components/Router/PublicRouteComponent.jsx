import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../Layout/Authentication';


//import { isLogin } from '../utils';
const isLogin = () => Auth.isAuthenticated();
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    //alert('public')
    return (

        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;