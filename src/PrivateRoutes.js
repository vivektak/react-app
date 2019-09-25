import React from 'react';
import { Redirect, Route } from 'react-router';
import localStorage from './services/storageService';
let data = localStorage.get('token');
export const PrivateRoutes = ({ component: Component, ...rest }) => (

    < Route
        {...rest}
        render={
            props =>
                data ? (
                    <Component {...props} />

                ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }}
                    />

        }
    />
)


