import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './Login';
import Register from './Register';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </Route>
)