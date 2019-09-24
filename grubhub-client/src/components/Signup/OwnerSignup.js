import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import grubhubLoginImage from '../../images/GrubhubLoginImage.png'
import { Row, Col } from 'react-bootstrap';

class OwnerSignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            email_id: "",
            password: "",
            address: "",
            phone_number: "",
            res_name: "",
            res_cuisine: "",
            res_zip_code: "",
            signupFlag: false
        }
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
            name: this.state.name,
            email_id: this.state.email_id,
            password: this.state.password,
            address: this.state.address,
            phone_number: this.state.phone_number,
            res_name: this.state.res_name,
            res_cuisine: this.state.res_cuisine,
            res_zip_code: this.state.res_zip_code
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/grubhub/signup/restaurant', data)
            .then(response => {
                if (response.status === 200) {
                    alert("You have registered your restaurant successfully")
                    this.setState({
                        signupFlag: true
                    })
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({
                        message: error.response.data
                    });
                }
            });
    }

    render() {
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/Home" />
        }
        else if (this.state.signupFlag) {
            redirectVar = <Redirect to="/Login" />
        }
        return (
            <div>
                {redirectVar}
                <Row>
                    <Col>
                        <div>
                            <img src={grubhubLoginImage} style={{ height: 'fit-content' }} alt='GrubHub' />
                        </div>
                    </Col>
                    <Col>
                        <div class="container">
                            <div class="login-form">
                                <div class="main-div">
                                    <div class="panel">
                                        <h2>Signup for new Restaurant Account</h2>
                                    </div>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="res_name" onChange={this.onChange} placeholder="Restaurant Name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="res_cuisine" onChange={this.onChange} placeholder="Cuisine" pattern="^[A-Za-z ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="email_id" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="res_zip_code" onChange={this.onChange} placeholder="ZIP Code" pattern="^[0-9]{5,6}$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="address" onChange={this.onChange} placeholder="Address" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="phone_number" onChange={this.onChange} placeholder="Phone Number" pattern="^[0-9]+$" required />
                                        </div>
                                        <div style={{ color: "#ff0000" }}>{this.state.message}</div><br />
                                        <button type="submit" class="btn btn-primary">Signin</button><br /><br />
                                        <div>Already have an account? <Link to='/login'>Login</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
//export Login Component
export default OwnerSignup;