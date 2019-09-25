import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navigationbar from '../Navigationbar.js';
import CustomerHome from './CustomerHome.js';
import OwnerHome from './OwnerHome.js';

class Home extends Component {
    render() {
        let homeComponent = null;
        let redirectVar = null;
        if (localStorage.getItem("user_id")) {
            if (localStorage.getItem("is_owner") === "1")
                homeComponent = <OwnerHome />
            else
                homeComponent = <CustomerHome />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar />
                {homeComponent}
            </div>
        )
    }
}
//export Login Component
export default Home;