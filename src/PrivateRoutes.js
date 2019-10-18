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
                    /> : (<Component {...props} />)
                //roleData.role === 'superadmin' ? (<Component {...props} />) : props.location.pathname === '/skills' || props.location.pathname === '/locations' ? <Redirect to={{ pathname: '/login' }} /> : (<Component {...props} />)


                // console.log('super') : props.location.pathname === '/skills' || props.location.pathname === '/locations' ? <Redirect to={{ pathname: '/login', state: { from: props.location } }}
                // /> : (
                //         <Component {...props} />
                //     )

            }
        />
    )
}

export default PrivateRoutes;


