import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Button, Alert } from "react-bootstrap";
import Navigationbar from '../Navigationbar.js';
import axios from 'axios';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_items: []
        };
    }

    componentWillMount() {
        this.getRestaurantDetails();
        let cartItems = new Array(),
            item_id_string = "";
        if (localStorage.getItem("cart_items")) {
            cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
            cartItems = cartItems.map(cartItem => parseInt(cartItem));
            this.setState({
                cart_items: cartItems
            });
        }
    };

    getRestaurantDetails = () => {
        let res_id;
        if (localStorage.getItem("cart_res_id")) {
            res_id = localStorage.getItem("cart_res_id");
            axios.get("http://localhost:3001/grubhub/restaurant/" + res_id)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            restaurant: response.data,
                        });
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                    }
                })
        }
    };

    render() {
        let redirectVar = null,
            message = null;

        console.log(this.state.cart_items);
        if (this.state && this.state.cart_items.length === 0) {
            message =
                [<center><Alert variant="warning">You haven't added any items to your cart. Please add your favorite items.</Alert><br />
                    <Button href="/home">Home</Button></center>
                ]
        }
        else{
            message = this.state.cart_items;
        }
        if (!localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar /><br />
                <h3>Cart</h3><br />
                {message}
            </div>
        )
    }
}
export default Cart;