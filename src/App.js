import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { Security, ImplicitCallback } from '@okta/okta-react';
import NavBar from './components/navBar';
import Shapes from './components/shapes';
import Users from './components/users';
import NotFound from './components/notFound';
import Home from './components/home';

const config = {
  issuer: 'https://dev-387262.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oahgxzktd6OPlsYW0h7'
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri}>
          <NavBar />
          <main className="container">
            <Switch>
              <Route path="/users" component={Users} />
              <Route path="/shapes" component={Shapes} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Home} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </Security>
      </React.Fragment>
    );
  }
}

export default App;
