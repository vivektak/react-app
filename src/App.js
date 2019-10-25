import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { Login } from './Components/Login';
import Register from './Components/Register';
import AddOpening from './Components/private/AddOpening';
import Openings from './Components/private/Openings';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from './Components/NotFound';
import PrivateRoutes from './PrivateRoutes';
import Skills from './Components/private/Skills';
import Locations from './Components/private/locations';
import MyReferrals from './Components/private/MyReferrals';
import { userContext } from './services/Context';
import localStorage from './services/storageService';
import http from './services/httpService';
import IdleTimer from 'react-idle-timer'
import Alert from 'react-s-alert'
import Dashboard from './Components/Dashboard';
import { info } from './services/notificationService';
import MyTickets from './Components/private/MyTickets';
import errorResponseHandler from './services/errorHandler';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_API_URL)

function App(props) {
  const [data, setData] = useState();
  let [idleTimer, setIdleTimer] = useState(null);

  const getUserInfo = () => {
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
        onIdle={onIdle}
        debounce={250}
        timeout={1000 * 60 * 10} />
      <Alert stack={{ limit: 1 }} html={true} />
      <userContext.Provider value={{ data, setData }}>
        <div className="App">
          <Switch>
            <Route path="/login" render={props => <Login {...props} socket={socket} />} />
            <Redirect from="/" exact to="/login" />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" render={props => <Dashboard {...props} socket={socket} />} />
            <PrivateRoutes path="/openings/:id" component={AddOpening} socket={socket} />
            <PrivateRoutes path="/openings" component={Openings} socket={socket} />
            <PrivateRoutes path="/my-referrals" component={MyReferrals} socket={socket} />
            <PrivateRoutes path="/my-tickets" component={MyTickets} socket={socket} />
            <PrivateRoutes path="/skills" component={Skills} socket={socket} />
            <PrivateRoutes path="/locations" component={Locations} socket={socket} />
            <PrivateRoutes path="/add-opening" component={AddOpening} socket={socket} />
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
