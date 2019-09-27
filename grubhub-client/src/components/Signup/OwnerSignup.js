import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ownerSignup } from '../../actions/signupActions'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import grubhubLoginImage from '../../images/GrubhubLoginImage.png'
import { Row, Col } from 'react-bootstrap';

class OwnerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
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

        this.props.ownerSignup(data);

        this.setState({
            signupFlag: 1
        });
    }

    render() {
        let redirectVar = null;
        let message = "";
        if (localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/Home" />
        }
        else if (this.props.user === "USER_ADDED" && this.state.signupFlag) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
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
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" class="btn btn-primary">Signup</button><br /><br />
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

OwnerSignup.propTypes = {
    customerSignup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.signup.user
});

export default connect(mapStateToProps, { ownerSignup })(OwnerSignup);