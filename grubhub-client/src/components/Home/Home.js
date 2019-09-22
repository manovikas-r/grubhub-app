import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '../Navbar.js';
import CustomerHome from './CustomerHome.js';
import OwnerHome from './OwnerHome.js';

class Home extends Component {
    render() {
        let homeComponent = null;
        let redirectVar = null;
        if (cookie.load('customercookie')) {
            homeComponent = <CustomerHome />
        }
        else if (cookie.load('ownercookie')) {
            homeComponent = <OwnerHome />
        }
        else
        {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navbar /><br/><br/><br/>
                {homeComponent}
            </div>
        )
    }
}
//export Login Component
export default Home;