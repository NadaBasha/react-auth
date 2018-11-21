import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import NavDropDown from "./NavDropdown";
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
    render() {
        let { authenticated, onLogout, onGoogleLogin, onMicrosoftLogin } = this.props;

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
                            authenticated ?
                                (<React.Fragment>
                                    <button className="btn btn-sm btn-outline-success m-2 my-sm-0" onClick={onLogout} type="button">Logout</button>
                                </React.Fragment>) :
                                (<React.Fragment>
                                    <NavItem path="/loginForm" name="Customized Login Form" />
                                    <button className="btn btn-sm btn-outline-success m-2 my-sm-0" onClick={onGoogleLogin} type="button">Login by Google</button>
                                    <button className="btn btn-sm btn-outline-success m-2 my-sm-0" onClick={onMicrosoftLogin} type="button">Login by Microsoft</button>
                                </React.Fragment>)
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
