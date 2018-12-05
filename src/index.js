import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Security } from '@okta/okta-react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

var baseUrl = 'https://dev-387262.oktapreview.com';
const config = {
    baseUrl: baseUrl,
    issuer: baseUrl + '/oauth2/default',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '0oahgxzktd6OPlsYW0h7',
    //client_id: '0oahqn3s0uPxuua4S0h7',
    logo: '//logo.clearbit.com/okta.com',
    idps: [
        { type: 'GOOGLE', id: '0oahhzjogklxbSYth0h7' },
        { type: 'MICROSOFT', id: '0oahi0gjucsAXnhnK0h7' }
    ],
    //idpDisplay: 'PRIMARY',
    //scope: ['openid', 'email', 'profile', 'address', 'offline_access'],
    //response_type: ['id_token', 'token', 'code']
}

ReactDOM.render(
    <BrowserRouter>
        <Security {...config}>
            <App />
        </Security>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
