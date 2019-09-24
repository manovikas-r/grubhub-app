import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import ImageUploader from "../ImageUploader";
import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            name: "",
            email_id: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        const data = {
            user_id: localStorage.getItem("user_id")
        };

        axios.post("http://localhost:3001/grubhub/profile/customerget", data)
            .then(response => {
                this.setState({
                    user_id: response.data[0].user_id,
                    name: response.data[0].name,
                    email_id: response.data[0].email_id,
                    address: response.data[0].address,
                    phone_number: response.data[0].phone_number
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onUpdate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        let data = {
            user_id: localStorage.getItem("user_id"),
            email_id: this.state.email_id,
            name: this.state.name,
            password: this.state.password,
            address: this.state.address,
            phone_number: this.state.phone_number
        };
        axios.post("http://localhost:3001/grubhub/profile/customer", data)
            .then(response => {
                console.log(response);
                localStorage.setItem("name", data.name);
                alert("Profile updated successfully!");
            })
            .catch(error => {
                console.log(error);
            });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Col>
                        <h4>Profile</h4>
                        <br />
                        <Form onSubmit={this.onUpdate} >
                            <Form.Row>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="name"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        required={true} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="email_id">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                        name="email_id"
                                        value={this.state.email_id}
                                        disabled />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="RB.password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        name="password"
                                        onChange={this.onChange}
                                        placeholder="New Password" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text"
                                        name="address"
                                        onChange={this.onChange}
                                        value={this.state.address}
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text"
                                        name="phone_number"
                                        onChange={this.onChange}
                                        value={this.state.phone_number}
                                        required={true}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <ButtonGroup aria-label="Third group">
                                <Button type="submit">
                                    Update Details</Button>
                            </ButtonGroup>

                            <ButtonGroup aria-label="Fourth group">
                                <Link to="/home"><Button variant="warning">Cancel</Button></Link>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Container>
            </div>
        )
    }
}
export default CustomerProfile;