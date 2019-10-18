import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { Login } from './Components/Login';
import Register from './Components/Register';
import AddOpening from './Components/private/AddOpening';
import Openings from './Components/private/Openings';

//import Header from './Components/Header';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from './Components/NotFound';
import PrivateRoutes from './PrivateRoutes';
//import Description from './Components/private/Description';
import Skills from './Components/private/Skills';
import Locations from './Components/private/locations';
import MyReferrals from './Components/private/MyReferrals';
import { userContext } from './services/Context';
import localStorage from './services/storageService';
import http from './services/httpService';
import IdleTimer from 'react-idle-timer'

import * as Constants from '../src/Constants/Constants';
import Alert from 'react-s-alert'
import Dashboard from './Components/Dashboard';
import { getThemeProps } from '@material-ui/styles';
import { info } from './services/notificationService';
import MyTickets from './Components/private/MyTickets';
//import { localStorage } from 'local-storage';


function App(props) {
  const [data, setData] = useState();
  let [idleTimer, setIdleTimer] = useState(null);

  const getUserInfo = () => {
    console.log(props)
    http.getWithHeader('user/info').then(res => {
      setData(res.data.data)
    })
  }

  useEffect(() => {
    if (localStorage.get('token'))
      getUserInfo();
  }, [])

  const onIdle = () => {

    if (localStorage.get('token')) {
      localStorage.removeItem('token');
      info('You are idle from last 10 minutes, Please Login again.')
      window.location.href = '/login';
    }

  }

  return (
    <div >
      <IdleTimer
        ref={ref => { idleTimer = ref }}
        element={document}
        //onActive={onActive}
        onIdle={onIdle}
        //onAction={onAction}
        debounce={250}
        timeout={1000 * 60 * 0.10} />
      <Alert stack={{ limit: 1 }} html={true} />
      <userContext.Provider value={{ data, setData }}>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} {...props} />
            <Redirect from="/" exact to="/login" />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <PrivateRoutes path="/openings/:id" component={AddOpening} key='1' />
            <PrivateRoutes path="/openings" component={Openings} key='2' />
            <PrivateRoutes path="/my-referrals" component={MyReferrals} key='3' />
            <PrivateRoutes path="/my-tickets" component={MyTickets} key='3' />
            <PrivateRoutes path="/skills" component={Skills} key='4' />
            <PrivateRoutes path="/locations" component={Locations} key='5' />
            <PrivateRoutes path="/add-opening" component={AddOpening} key='6' />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Login} {...props} />
            <Redirect to="/not-found" />
          </Switch>



        </div>
      </userContext.Provider>
    </div>
  );
}

export default App;
