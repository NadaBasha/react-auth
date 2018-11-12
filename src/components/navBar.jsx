import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./navItem";
import NavDropDown from "./navDropdown";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
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
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
