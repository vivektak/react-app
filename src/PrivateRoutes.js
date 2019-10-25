import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import localStorage from './services/storageService';
import http from './services/httpService';



const PrivateRoutes = ({ component: Component, ...rest }) => {

    const [roleData, setRoleData] = useState('');

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            setRoleData(res.data.data);
        })
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (

        <Route
            {...rest}
            render={
                props =>
                    !localStorage.get('token') ? <Redirect to={{ pathname: '/login', state: { from: props.location } }}
                    /> : (<Component {...props} {...rest} />)
            }
        />
    )
}

export default PrivateRoutes;


