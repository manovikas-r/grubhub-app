import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomer, updateCustomer } from '../../actions/customerProfileActions'
import { Link } from "react-router-dom";
import { Container, Col, Form, Button, ButtonGroup } from 'react-bootstrap';

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        this.props.getCustomer();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            var { user } = nextProps;

            var userData = {
                user_id: user.user_id,
                name: user.name,
                email_id: user.email_id, 
                address: user.address,
                phone_number: user.phone_number
            };

            this.setState(userData);
        }
    }

    onUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();

        //make a post request with the user data
        let data = Object.assign({}, this.state);
        this.props.updateCustomer(data);
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
                                        pattern="^[A-Za-z0-9 ]+$"
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
                                    <Form.Label>Change Password</Form.Label>
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
                                        pattern="^[0-9]+$"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <ButtonGroup aria-label="Third group">
                                <Button type="submit" variant="success">Update Details</Button>
                            </ButtonGroup>
                            {"  "}
                            <ButtonGroup aria-label="Fourth group">
                                <Link to="/home"><Button variant="secondary">Cancel</Button></Link>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Container>
            </div>
        )
    }
}

CustomerProfile.propTypes = {
    getCustomer: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.customerProfile.user
});

export default connect(mapStateToProps, { getCustomer, updateCustomer })(CustomerProfile);