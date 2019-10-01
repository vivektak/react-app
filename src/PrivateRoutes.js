import React from 'react';
import { Redirect, Route } from 'react-router';
import localStorage from './services/storageService';



export const PrivateRoutes = ({ component: Component, ...rest }) => (

    < Route
        {...rest}
        render={
            props =>
                localStorage.get('token') ? (
                    <Component {...props} />

                ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }}
                    />

        }
    />
)


