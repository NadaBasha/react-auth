import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      accessToken: null,
      idToken: null,
      parsedAccessToken: null,
      parsedIdToken: null
    };
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
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

  async getTokens() {
    let accessToken = await this.props.auth.getAccessToken();
    let idToken = await this.props.auth.getIdToken();
    let parsedAccessToken = this.parseJwt(accessToken);
    let parsedIdToken = this.parseJwt(idToken);
    this.setState({ accessToken, idToken, parsedAccessToken, parsedIdToken });
  }

  render() {
    if (this.state.authenticated === null) return null;

    let button;
    if (this.state.authenticated) {
      button = <button onClick={() => this.logout()}>Logout</button>;
    } else {
      button = <button onClick={() => this.login()}>Login</button>;
    }

    return (<React.Fragment>
      {button}
      <br></br>
      <button onClick={() => this.getTokens()}>Get Authentication</button><br></br>
      <br></br>
      <a href="https://dev-387262.oktapreview.com/oauth2/v1/authorize?idp=0oahhzjogklxbSYth0h7&client_id=0oahgxzktd6OPlsYW0h7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:3000/implicit/callback&state=WM6D&nonce=YsG76jo">Login With Google</a>

      <br></br>
      <a href="https://dev-387262.oktapreview.com/oauth2/v1/authorize?idp=0oahi0gjucsAXnhnK0h7&client_id=0oahgxzktd6OPlsYW0h7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:3000/implicit/callback&state=WM6D&nonce=YsG76jo">Login With Microsoft</a>
      <br></br>
      <label>{this.state.accessToken}</label>
      <label>{this.state.idToken}</label>
    </React.Fragment>)
  }
})