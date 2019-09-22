import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import grubhubLoginImage from '../images/GrubhubLoginImage.png'

class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            errorMessage: ""
        }
        //Bind the handlers to this class
        //this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    onSubmit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data

        axios.post('http://localhost:3001/login', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                }
                else {
                    this.setState({
                        authFlag: false
                    })
                }
            })
            .catch(error => {
                if(error.response.data){
                    this.setState({
                        authFlag: false,
                        message: error.response.data
                    });
                }
            });
    }

    render() {
        let redirectVar = null;
        if (cookie.load('ownercookie') || cookie.load('customercookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <img src={grubhubLoginImage} style={{ height: 'fit-content', width: '60%' }} alt='GrubHub' />
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Signin with your Grubhub account</h2>
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div style={{ color: "#ff0000" }}>{this.state.message}</div><br />
                                <div class="form-group">
                                    <input type="email" class="form-control" onChange={this.onChange} name="email_id" placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" onChange={this.onChange} name="password" placeholder="Password" required />
                                </div>
                                <button type="submit" class="btn btn-primary">Signin</button><br /><br />

                                <div><Link to="/signup">Create new account</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;