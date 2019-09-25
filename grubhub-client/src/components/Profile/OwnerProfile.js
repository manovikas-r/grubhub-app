import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOwner, updateOwner } from '../../actions/ownerProfileActions'
import { Container, Col, Form, Button, ButtonGroup } from 'react-bootstrap';

class OwnerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        this.props.getOwner();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            var { user } = nextProps;

            var userData = {
                user_id: user.user_id || this.state.user_id,
                name: user.name || this.state.name,
                email_id: user.email_id || this.state.email_id,
                address: user.address || this.state.address,
                phone_number: user.phone_number || this.state.phone_number,
                res_name: user.res_name || this.state.res_name,
                res_cuisine: user.res_cuisine || this.state.res_cuisine,
                res_zip_code: user.res_zip_code || this.state.res_zip_code
            };

            this.setState(userData);
        }
    }

    onUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();

        //make a post request with the user data
        let data = Object.assign({}, this.state);
        this.props.updateOwner(data);
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

OwnerProfile.propTypes = {
    getOwner: PropTypes.func.isRequired,
    updateOwner: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.ownerProfile.user
});

export default connect(mapStateToProps, { getOwner, updateOwner })(OwnerProfile);


