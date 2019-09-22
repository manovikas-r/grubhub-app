import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '../Navbar.js';
import CustomerProfile from './CustomerProfile.js';
import OwnerProfile from './OwnerProfile.js';

class Profile extends Component {
    render() {
        let profileComponent = null;
        if (cookie.load('customercookie')) {
            profileComponent = <CustomerProfile />
        }
        if (cookie.load('ownercookie')) {
            profileComponent = <OwnerProfile />
        }
        return (
            <div>
                <Navbar /><br/><br/><br/>
                {profileComponent}
            </div>
        )
    }
}
export default Profile;