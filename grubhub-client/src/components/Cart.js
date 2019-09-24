import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navigationbar from './Navigationbar.js';

class Cart extends Component {
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
                <h3>Cart</h3>
            </div>
        )
    }
}
export default Cart;