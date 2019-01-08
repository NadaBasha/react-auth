import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Security } from '@okta/okta-react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

var baseUrl = 'https://auth.landdb.com';
const config = {
    baseUrl: baseUrl,
    issuer: baseUrl + '/oauth2/auscm85nULtgvMzWV355',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '0oa71hm2iVMeweyJv356',
    logo: 'http://www.agconnections.com/assets/images/icons/agc-logo-small-2.png',
    idps: [
        { type: 'GOOGLE', id: '0oaceqxjdfOdFMGUt355' },
        { type: 'MICROSOFT', id: '0oacjef8kdbT7S4p8355' }
    ]    
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
