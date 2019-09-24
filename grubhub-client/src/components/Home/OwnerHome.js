import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


class OwnerHome extends Component {
    render() {
        return (
            <div>
                <h3>Welcome to Grubhub!</h3>
            </div>
        )
    }
}
export default OwnerHome;