import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { Login } from './Components/Login';
import Register from './Components/Register';
import AddOpening from './Components/private/AddOpening';
import Openings from './Components/private/Openings';

//import Header from './Components/Header';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from './Components/NotFound';
import { PrivateRoutes } from './PrivateRoutes';
import Description from './Components/private/Description';
import Skills from './Components/private/Skills';
import Locations from './Components/private/locations';
import MyReferrals from './Components/private/MyReferrals';
import { userContext } from './services/Context';
import localStorage from './services/storageService';
import http from './services/httpService';

import * as Constants from '../src/Constants/Constants';

function App() {
  const [data, setData] = useState();

  const getUserInfo = () => {
    const res = localStorage.get(Constants.TOKEN)
    let headers = {
      token: res
    }
    http.getWithHeader('user/info', { headers }).then(res => {
      setData(res.data.data)
    })
  }

  useEffect(() => {
    if (localStorage.get('token'))
      getUserInfo();
  }, [])

  return (
    <div >
      <userContext.Provider value={{ data, setData }}>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect from="/" exact to="/login" />
            <Route path="/register" component={Register} />
            <PrivateRoutes path="/openings/:id" component={AddOpening} />
            <PrivateRoutes path="/openings" component={Openings} />
            <Route path="/skills" render={props => {
              if (data && data.role === 'admin')
                return <Skills {...props}></Skills>
              return <Redirect to="/not-found" />

            }} />
            <Route path="/locations" render={props => {
              if (data && data.role === 'admin')
                return <Locations {...props}></Locations>
              return <Redirect to="/not-found" />

            }} />

            <PrivateRoutes path="/description/:id" exact component={Description} />
            <PrivateRoutes path="/add-opening" component={AddOpening} />
            <PrivateRoutes path="/my-referrals" component={MyReferrals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Login} />
            <Redirect to="/not-found" />
          </Switch>



        </div>
      </userContext.Provider>
    </div>
  );
}

export default App;
