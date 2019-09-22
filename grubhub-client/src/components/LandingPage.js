import React, { Component } from 'react';
import '../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from './Navbar.js'
import grubhubLoginImage from '../images/GrubhubLoginImage.png'

class LandingPage extends Component {
    render() {
        let redirectVar = null;
        if (cookie.load('ownercookie') || cookie.load('customercookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <Navbar /><br/><br/><br/>
                <div>
                    <img src={grubhubLoginImage} style={{ height: 'fit-content', width: '60%' }} alt='GrubHub' />
                </div>
                Welcome to Grubhub!<br/>
                Please login to place the orders.
            </div>
        )
    }
}
//export Login Component
export default LandingPage;