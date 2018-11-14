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
  client_id: '0oahgxzktd6OPlsYW0h7',
  idps: [
    { type: 'GOOGLE', id: '0oahhzjogklxbSYth0h7' }
  ],
  idp: '0oahhzjogklxbSYth0h7',
  authParams: {
    responseMode: 'query'
  }
}

class App extends Component {
  render() {
    console.log(config);
    return (
      <React.Fragment>
        <Security {...config}>
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
      </React.Fragment >
    );
  }
}

export default App;
