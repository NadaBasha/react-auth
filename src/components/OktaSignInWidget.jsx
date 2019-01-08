import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

export default class OktaSignInWidget extends Component {

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this.widget = new OktaSignIn({
            logo: this.props.config.logo, // Try changing "okta.com" to other domains, like: "workday.com", "splunk.com", or "delmonte.com"
            features: {
                rememberMe: true,                   // Setting to false will remove the checkbox to save username
                showPasswordToggleOnSignInPage: true
            },
            baseUrl: this.props.config.baseUrl,
            clientId: this.props.config.client_id,
            redirectUri: this.props.config.redirect_uri,
            authParams: {
                issuer: this.props.config.issuer,
                responseType: ['id_token', 'token'],
                scopes: ['openid', 'email', 'profile'],
            },
            i18n: {
                en: {
                    'primaryauth.title': 'Sign in to Land.db'
                }
            },
            idps: this.props.config.idps,
            idpDisplay: 'PRIMARY'
        });
        this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
    }

    componentWillUnmount() {
        this.widget.remove();
    }

    render() {
        return <div />;
    }
};