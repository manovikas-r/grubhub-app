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
        if (cookie.load('customercookie')) {
            ordersComponent = <CustomerOrders />
        }
        if (cookie.load('ownercookie')) {
            ordersComponent = <OwnerOrders />
        }
        return (
            <div>
                <Navbar /><br/><br/><br/>
                {ordersComponent}
            </div>
        )
    }
}
export default Orders;