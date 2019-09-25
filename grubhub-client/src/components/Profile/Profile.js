import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navigationbar from '../Navigationbar';
import CustomerProfile from './CustomerProfile';
import OwnerProfile from './OwnerProfile';
import ImageUploader from '../ImageUploader';
import { Container, Row, Col } from 'react-bootstrap';

class Profile extends Component {
    render() {
        let profileComponent = null;
        let redirectVar = null;
        if (localStorage.getItem("user_id")) {
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
                <Navigationbar /><br />
                <Container fluid={true}>
                    <Row>
                        <Col xs={6} md={4}>
                            <ImageUploader />
                        </Col>
                        <Col>
                            {profileComponent}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Profile;