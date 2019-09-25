import React, { Component } from 'react';
import '../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Navigationbar from './Navigationbar'
import grubhubLoginImage from '../images/GrubhubLoginImage.png'
import { Row, Col } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        let redirectVar = null;
        if (localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar />
                <div>
                    <Row>
                        <Col>
                            <img src={grubhubLoginImage} style={{ height: 'fit-content', width: '100%' }} alt='GrubHub' />
                        </Col>
                        <Col>
                            <center>
                                Welcome to Grubhub!<br />
                                Please <Link to='/login'>login</Link> to place your order.
                            </center>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default LandingPage;