import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login.js';
import OwnerSignup from './Signup/OwnerSignup.js';
import CustomerSignup from './Signup/CustomerSignup.js';
import Home from './Home/Home.js';
import Profile from './Profile/Profile.js';
import LandingPage from './LandingPage.js';
import Restaurant from './Restaurant/Restaurant'
import Cart from './Cart/Cart.js';
import Menu from './Menu/Menu.js';
import Orders from './Orders/Orders.js';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/restaurant/signup" component={OwnerSignup} />
                <Route path="/signup" component={CustomerSignup} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/restaurant" component={Restaurant} />
                <Route path="/orders" component={Orders} />
                <Route path="/cart" component={Cart} />
                <Route path="/menu" component={Menu} />
            </div>
        )
    }
}
export default Main;