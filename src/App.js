import React, { Component, lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { Security, ImplicitCallback } from '@okta/okta-react';
const NavBar = lazy(() => import('./components/NavBar'));
const Shapes = lazy(() => import('./components/Shapes'));
const Users = lazy(() => import('./components/Users'));
const NotFound = lazy(() => import('./components/NotFound'));
const Login = lazy(() => import('./components/Login'));

var baseUrl = 'https://dev-387262.oktapreview.com';
const config = {
  baseUrl: baseUrl,
  issuer: baseUrl + '/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oahgxzktd6OPlsYW0h7',
  logo: '//logo.clearbit.com/okta.com',
  idps: [
    { type: 'GOOGLE', id: '0oahhzjogklxbSYth0h7' },
    { type: 'MICROSOFT', id: '0oahi0gjucsAXnhnK0h7' }
  ]
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Security {...config}>
          <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <main className="container">
              <Switch>
                <Route path="/users" component={Users} />
                <Route path="/shapes" component={Shapes} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" exact component={Users} />
                <Route path="/implicit/callback" component={ImplicitCallback} />
                <Route path="/loginForm" component={Login} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </Suspense>
        </Security>
      </React.Fragment >
    );
  }
}

export default App;
