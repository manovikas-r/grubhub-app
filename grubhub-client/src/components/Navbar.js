import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import grubhubLogo from "../images/grubhubLogo.png";

//create the Navbar Component
class Navbar extends Component {

    //handle logout to destroy the cookie
    handleLogout = () => {
        if (cookie.load("cookie")) {
            cookie.remove("cookie", { path: "/" });
            localStorage.clear();
        }
    };

    render() {
        let navLogo = null;
        let navUser = null;
        let navLogin = null;
        let navProfile = null;
        let navOrders = null;
        let loginLink = null;
        let userMsg = null;

        if (cookie.load("cookie")) {
            userMsg = "Hi, " + localStorage.getItem("name");
            loginLink = <Link to="/" class="nav-link" onClick={this.handleLogout}>Logout</Link>;
        }
        else {
            loginLink = <Link to="/login" class="nav-link" onClick={this.handleLogout}>Login</Link>;
        }

        navLogo = (
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <Link to='/' class="nav-link" href="#">
                        <img src={grubhubLogo} width="60" height="auto" class="d-inline-block align-top" alt="Grubhub" />
                    </Link>
                </li>
            </ul>
        );

        navLogin = (
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    {loginLink}
                </li>
            </ul>
        );

        navProfile = (
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <Link to="/profile" class="nav-link" href="#">
                        Profile
                    </Link>
                </li>
            </ul>
        );

        navOrders = (
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <Link to="/orders" class="nav-link" href="#">
                        Orders
                    </Link>
                </li>
            </ul>
        );

        if (cookie.load("cookie")) {
            if (localStorage.getItem("is_owner") === "1") {
                navUser = (
                    <div class="collapse navbar-collapse navbar-right" id="navbarNav">
                        <ul class="nav navbar-nav navbar-right">
                            <li class="nav-item">
                                <Link to="/updatemenu" class="nav-link" href="#">
                                    Menu
                                </Link>
                            </li>
                        </ul>
                        {navOrders}
                        {navProfile}
                        {navLogin}
                    </div>
                );
            }
            else {
                navUser = (
                    <div class="collapse navbar-collapse navbar-right" id="navbarNav">
                        <ul class="nav navbar-nav navbar-right">
                            <li class="nav-item">
                                <Link to="/cart" class="nav-link" href="#">
                                    Cart
                            </Link>
                            </li>
                        </ul>
                        {navOrders}
                        {navProfile}
                        {navLogin}
                    </div>
                );
            }
        }
        else {
            navUser = (
                <div class="collapse navbar-collapse navbar-right" id="navbarNav">
                    {navLogin}
                </div>
            );
        }

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark  bg-dark">
                    {navLogo}
                    {userMsg}
                    {navUser}
                </nav>
            </div>
        );
    }
}

export default Navbar;