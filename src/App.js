import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ImplicitCallback } from '@okta/okta-react';
import { UserProvider } from './contexts/UserContext';
import { withAuth } from '@okta/okta-react';

import NavBar from './components/NavBar';
import Shapes from './components/Shapes';
import Users from './components/Users';
import NotFound from './components/NotFound';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      idToken: null
    };
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      if (authenticated) {
        let idToken = await this.props.auth.getIdToken();
        let accessToken = await this.props.auth.getAccessToken();
        console.log('idToken', this.parseJwt(idToken));
        console.log('accessToken', this.parseJwt(accessToken));
        this.setState({ authenticated, idToken: this.parseJwt(idToken) });
      }
      else {
        this.setState({ authenticated, idToken: null });
      }
    }
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
  }

  async loginByGoogle() {
    const responseType = this.props.auth._config.response_type
      || ['id_token', 'token'];

    const scopes = this.props.auth._config.scope
      || ["openid", "profile", "email", "address", "phone", "offline_access"];

    this.props.auth._oktaAuth.token.getWithRedirect({
      responseType: responseType,
      scopes: scopes,
      idp: '0oahhzjogklxbSYth0h7'
    });
  }

  async loginByMicrosoft() {
    const responseType = this.props.auth._config.response_type
      || ['id_token', 'token'];

    const scopes = this.props.auth._config.scope
      || ['openid', 'email', 'profile'];

    this.props.auth._oktaAuth.token.getWithRedirect({
      responseType: responseType,
      scopes: scopes,
      idp: '0oahi0gjucsAXnhnK0h7'
    });
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  render() {
    return (
      <React.Fragment>
        <UserProvider value={{ accessToken: this.state.accessToken, idToken: this.state.idToken }}>
          <NavBar authenticated={this.state.authenticated}
            onLogout={() => this.logout()}
            onGoogleLogin={() => this.loginByGoogle()}
            onMicrosoftLogin={() => this.loginByMicrosoft()} />
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
        </UserProvider>
      </React.Fragment>
    );
  }
}

export default withAuth(App);
