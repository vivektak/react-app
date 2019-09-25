import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import AddOpening from './Components/AddOpening';
import Openings from './Components/Openings';

//import Header from './Components/Header';
import { Route, Redirect, Switch } from 'react-router';
import NotFound from './Components/NotFound';
import { PrivateRoutes } from './PrivateRoutes';



function App() {
  return (
    <div >

      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoutes path="/register" component={Register} />
          <PrivateRoutes path="/openings/:id" component={AddOpening} />
          <PrivateRoutes path="/openings" component={Openings} />
          <PrivateRoutes path="/add-opening" component={AddOpening} />
          <PrivateRoutes path="/not-found" component={NotFound} />
          <PrivateRoutes path="/" exact component={Login} />
          <Redirect to="/not-found" />
        </Switch>



      </div>
    </div>
  );
}

export default App;
