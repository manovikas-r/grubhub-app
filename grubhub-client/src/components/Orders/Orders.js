import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '../Navbar.js';
import CustomerOrders from './CustomerOrders.js';
import OwnerOrders from './OwnerOrders.js';

class Orders extends Component {
    render() {
        let ordersComponent = null;
        let redirectVar = null;
        if (cookie.load('cookie')) {
            if (localStorage.getItem("is_owner") === "1")
                ordersComponent = <OwnerOrders/>
            else
                ordersComponent = <CustomerOrders />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navbar /><br/><br/><br/>
                {ordersComponent}
            </div>
        )
    }
}
export default Orders;