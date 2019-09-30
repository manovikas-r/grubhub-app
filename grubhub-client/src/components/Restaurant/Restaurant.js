import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import ItemCard from "./ItemCard"
import { InputGroup, FormControl, Form, Button, Card, DropdownButton, Dropdown, Alert, Container, Col, Row } from 'react-bootstrap';
import Navigationbar from '../Navigationbar';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.setState({
            menu_sections: [],
            menu_items: []
        });
        this.sectionItems = this.sectionItems.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.getSections();
        this.getMenuItems();
    }

    getSections = () => {
        axios.get("http://localhost:3001/grubhub/menu/sections/" + this.props.location.state.owner_user_id)
            .then(response => {
                if (response.data[0]) {
                    this.setState({
                        menu_sections: response.data
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
            });
    };

    getMenuItems = () => {
        axios.get("http://localhost:3001/grubhub/menu/items/" + this.props.location.state.owner_user_id)
            .then(response => {
                if (response.data[0]) {
                    this.setState({
                        menu_items: response.data
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
            });
    };

    sectionItems = (menu_section) => {
        var itemsRender = [], items, item, section;


        if (this.state && this.state.menu_items && this.state.menu_items.length > 0) {
            items = this.state.menu_items.filter(menu_item => menu_item.menu_section_id === menu_section.menu_section_id);
            if (items.length > 0) {
                section = <h4>{menu_section.menu_section_name}</h4>;
                itemsRender.push(section);
                for (var i = 0; i < items.length; i++) {
                    item = <ItemCard menu_item={items[i]} onButtonClick={this.addToCart} />;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    addToCart = (e) => {
        let item_id = e.target.name;
        e.target.textContent = "Added to Cart";
        let cartItems = new Array();

        if (localStorage.getItem("cart_res_id") !== this.props.location.state.res_id) {
            localStorage.setItem("cart_items", cartItems);
        }

        if (localStorage.getItem("cart_items")) {
            cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
        }

        if (!cartItems.includes(item_id)) {
            cartItems.push(item_id);
            localStorage.setItem("cart_res_id", this.props.location.state.res_id);
            localStorage.setItem("cart_items", JSON.stringify(cartItems));
        }
    };

    render() {
        let redirectVar = null,
            section = null,
            restaurant = this.props.location.state;
        let resImageSrc = "http://localhost:3001/grubhub/images/restaurant/" + restaurant.res_image,
            renderOutput = [];

        if (!this.props.location.state) {
            redirectVar = <Redirect to="/home" />
        }
        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            for (var i = 0; i < this.state.menu_sections.length; i++) {
                section = this.sectionItems(this.state.menu_sections[i]);
                renderOutput.push(section);
            }
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar />

                <Card bg="info" text="white" style={{ width: "70rem", height: "15rem", margin: "2%" }}>
                    <Row>
                        <Col>
                            <Card.Img style={{ width: "18rem", height: "15rem" }} src={resImageSrc} />
                        </Col>
                        <Card.Body>
                            <Card.Title><h1>{restaurant.res_name}</h1></Card.Title>
                            <br />
                            <Card.Text><h4>{restaurant.address} | {restaurant.res_zip_code} | {restaurant.phone_number}</h4></Card.Text>
                            <br />
                            <Card.Text><h4>Cuisine: {restaurant.res_cuisine}</h4></Card.Text>
                        </Card.Body>
                    </Row>
                </Card>
                <Container>
                    {renderOutput}
                </Container>
                <center>
                    <Button name="goToCart" href="/cart">Go To Cart</Button>
                </center>
            </div>
        )
    }
}

export default Restaurant;