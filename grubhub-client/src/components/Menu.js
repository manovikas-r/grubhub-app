import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navigationbar from './Navigationbar.js';

class Menu extends Component {
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("user_id")) {
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