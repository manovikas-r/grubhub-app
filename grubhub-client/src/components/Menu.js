import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navigationbar from './Navigationbar.js';

class Menu extends Component {
    render() {
        let ordersComponent = null;
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar /><br/>
                <h3>Menu</h3>
            </div>
        )
    }
}
export default Menu;