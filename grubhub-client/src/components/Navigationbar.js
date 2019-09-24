import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import grubhubLogo from "../images/grubhubLogo.png";
import { Navbar, Nav, Form } from 'react-bootstrap';

//create the Navbar Component
class Navigationbar extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem("name")
    }
  }

  componentDidMount() {
    this.setState({
      name: localStorage.getItem("name")
    })
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    if (cookie.load("cookie")) {
      cookie.remove("cookie", { path: "/" });
      window.localStorage.clear();
    }
  };

  render() {
    let navLogo = null;
    let navUser = null;
    let navLogin = null;
    let navProfile = null;
    let navOrders = null;
    let loginLink = null;
    let nameMsg = null;

    if (cookie.load("cookie")) {
      loginLink = <Link to="/" class="nav-link" onClick={this.handleLogout}>Logout</Link>;
    }
    else {
      loginLink = <Link to="/login" class="nav-link" onClick={this.handleLogout}>Login</Link>;
    }

    navLogo = (
      <Link to='/' class="nav-link" href="#">
        <img src={grubhubLogo} width="150" height="auto" class="d-inline-block align-top" alt="Grubhub" />
      </Link>
    );

    navLogin = (
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          {loginLink}
        </li>
      </ul>
    );

    nameMsg = (
      <Link to="/profile" class="nav-link" href="#">
        Hi, {this.state.name}
      </Link>
    );

    navProfile = (
      <Link to="/profile" class="nav-link" href="#">
        Profile
      </Link>
    );

    navOrders = (
      <Link to="/orders" class="nav-link" href="#">
        Orders
          </Link>
    );

    if (cookie.load("cookie")) {
      if (localStorage.getItem("is_owner") === "1") {

        navUser = (
          <div class="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto">
              <Nav.Link href="#Menu">
                <Link to="/menu" class="nav-link" href="#">
                  Menu
                </Link>
              </Nav.Link>
              <Nav.Link href="#nacOrders">{navOrders}</Nav.Link>
              <Nav.Link href="#nacProfile">{navProfile}</Nav.Link>
            </Nav>
            <Nav.Link href="#nacProfile">{nameMsg}</Nav.Link>
            <Nav.Link href="#nacLogin">{navLogin}</Nav.Link>
          </div>
        );
      }
      else {
        navUser = (
          <div class="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto">
              <Nav.Link href="#nacOrders">{navOrders}</Nav.Link>
              <Nav.Link href="#Menu">
                <Link to="/cart" class="nav-link" href="#">
                  Cart
                </Link>
              </Nav.Link>
              <Nav.Link href="#nacProfile">{navProfile}</Nav.Link>
            </Nav>
            <Nav.Link href="#nacProfile">{nameMsg}</Nav.Link>
            <Nav.Link href="#nacLogin">{navLogin}</Nav.Link>
          </div>
 
        );
      }
    }
    else {
      navUser = (
        <div class="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
          </Nav>
          <Nav.Link href="#nacLogin">{navLogin}</Nav.Link>
        </div>
      );
    }

    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">{navLogo}</Navbar.Brand>
          {navUser}
        </Navbar>
      </div>
    );
  }
}

export default Navigationbar;