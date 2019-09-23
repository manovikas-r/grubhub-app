import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '../Navbar';
import CustomerProfile from './CustomerProfile';
import OwnerProfile from './OwnerProfile';
import ImageUploader from '../ImageUploader';

class Profile extends Component {
    render() {
        let profileComponent = null;
        let redirectVar = null;
        if (cookie.load('cookie')) {
            if (localStorage.getItem("is_owner") === "1")
                profileComponent = <OwnerProfile />
            else
                profileComponent = <CustomerProfile />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navbar /><br />
                <div>
                    <ImageUploader />
                </div><br/>
                <div>{profileComponent}</div>

            </div>
        )
    }
}
export default Profile;