import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import NavDropDown from "./NavDropdown";
import { NavLink } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: null,
        };
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async componentDidUpdate() {
        console.log('checking authentication')
        await this.checkAuthentication();
        console.log(this.state.authenticated);
    }

    routeChange() {
        let path = '/loginForm';
        this.props.history.push(path);
    }

    async loginByGoogle() {
        const responseType = this.props.auth._config.response_type
            || ['id_token', 'token'];

        const scopes = this.props.auth._config.scope
            || ['openid', 'email', 'profile'];

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

    render() {
        if (this.state.authenticated === null) return null;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    NavBar
            </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        <NavItem path="/users" name="Users" />
                        <NavItem path="/shapes" name="Shapes" />
                        <NavDropDown name="Dropdown">
                            <NavLink className="dropdown-item" to="/users">Users</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/shapes">Shapes</NavLink>
                        </NavDropDown>
                        {
                            !(this.state.authenticated) &&
                            (<React.Fragment>
                                <NavItem path="/loginForm" name="Customized Login Form" />
                                <button className="btn btn-sm btn-outline-success m-2 my-sm-0" onClick={() => this.loginByGoogle()} type="button">Login by Google</button>
                                <button className="btn btn-sm btn-outline-success m-2 my-sm-0" onClick={() => this.loginByMicrosoft()} type="button">Login by Microsoft</button>
                            </React.Fragment>)
                        }
                        {
                            (this.state.authenticated) &&
                            (<React.Fragment>
                                <button className="btn btn-sm btn-outline-success m-2 my-sm-0" onClick={() => this.logout()} type="button">Logout</button>
                            </React.Fragment>)
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

NavBar.contextType = UserContext;

export const UserContext = React.createContext(
    null
);

export default withAuth(NavBar);
