import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!JSON.parse(localStorage.getItem('isAuthenticated'))) {
                return <Redirect to='register' />
            }
            else {
                return <Component {...props} />
            }
        }}


    />
)


export default PrivateRoute