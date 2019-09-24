import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';

class OwnerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            name: "",
            email_id: "",
            password: "",
            res_name: "",
            res_cuisine: "",
            res_zip_code: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        const data = {
            user_id: localStorage.getItem("user_id")
        };

        axios.post("http://localhost:3001/grubhub/profile/restaurantget", data)
            .then(response => {
                this.setState({
                    user_id: response.data[0].user_id,
                    name: response.data[0].name,
                    email_id: response.data[0].email_id,
                    address: response.data[0].address,
                    phone_number: response.data[0].phone_number,
                    res_name: response.data[0].res_name,
                    res_cuisine: response.data[0].res_cuisine,
                    res_zip_code: response.data[0].res_zip_code
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
            phone_number: this.state.phone_number,
            res_name: this.state.res_name,
            res_cuisine: this.state.res_cuisine,
            res_zip_code: this.state.res_zip_code
        };
        axios.post("http://localhost:3001/grubhub/profile/restaurant", data)
            .then(response => {
                localStorage.setItem("name", data.name);
                alert("Profile updated successfully!");
                console.log(response);
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
                                <Form.Group as={Col} controlId="res_name">
                                    <Form.Label>Restaurant Name</Form.Label>
                                    <Form.Control name="res_name"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.res_name}
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="res_cuisine">
                                    <Form.Label>Cuisine</Form.Label>
                                    <Form.Control name="res_cuisine"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.res_cuisine}
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
                                <Form.Group as={Col} controlId="res_zip_code">
                                    <Form.Label>ZIP Code</Form.Label>
                                    <Form.Control type="text"
                                        name="res_zip_code"
                                        onChange={this.onChange}
                                        value={this.state.res_zip_code}
                                        required={true}
                                    />
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
           /* <div>
                <h2>Profile</h2>
                <form onSubmit={this.onUpdate}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="res_name">Restaurant Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="res_name"
                                onChange={this.onChange}
                                value={this.state.res_name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="res_cuisine">Cuisine</label>
                            <input
                                type="text"
                                className="form-control"
                                name="res_cuisine"
                                onChange={this.onChange}
                                value={this.state.res_cuisine}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email_id"
                                value={this.state.email_id}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Change Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                placeholder = "New Password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="res_zip_code">ZIP Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="res_zip_code"
                                onChange={this.onChange}
                                value={this.state.res_zip_code}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                onChange={this.onChange}
                                value={this.state.address}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                onChange={this.onChange}
                                value={this.state.phone_number}
                            />
                        </div>
                        <button type="submit" className="col-sm-12 btn btn-primary">
                            Update
                        </button>
                        <Link to="/home">
                            <button className="col-sm-12 btn btn-primary">cancel</button>
                        </Link>

                </form>
            </div>*/
        )
    }
}
export default OwnerProfile;


