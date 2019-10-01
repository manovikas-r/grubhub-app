import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Alert, Container, Table, Form } from "react-bootstrap";
import Navigationbar from '../Navigationbar.js';
import axios from 'axios';
import deleteIcon from "../../images/delete.jpg";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_items: [],
            res_items: []
        };
        this.clearCart = this.clearCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getRestaurantDetails();
        this.getRestaurantItems();
    }

    componentWillMount() {
        let cartItems = [],
            cart_items = [],
            item_id_string = "";
        if (localStorage.getItem("cart_items")) {
            cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
            cartItems = cartItems.map(cartItem => {
                return {
                    item_id: parseInt(cartItem),
                    item_quantity: 1
                }
            });
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

    getRestaurantItems = () => {
        let res_id;
        if (localStorage.getItem("cart_res_id")) {
            res_id = localStorage.getItem("cart_res_id");
            axios.get("http://localhost:3001/grubhub/restaurant/items/" + res_id)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            res_items: response.data,
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

    onQuantityChange = (e) => {
        let item_id = parseInt(e.target.name);
        let newQuantity = e.target.value;
        let cart_items = this.state.cart_items;
        let index = cart_items.findIndex((cart_item => cart_item.item_id === item_id));
        cart_items[index].item_quantity = newQuantity;
        this.setState({
            cart_items: cart_items
        });
    };

    removeItem = (e) => {
        let item_id = parseInt(e.target.name);
        let cart_items = this.state.cart_items;
        let items = [];
        let index = cart_items.findIndex((cart_item => cart_item.item_id === item_id));
        cart_items.splice(index, 1);
        this.setState({
            cart_items: cart_items
        });

        items.push(...JSON.parse(localStorage.getItem("cart_items")));
        index = items.indexOf(item_id.toString());
        if (index > -1) {
            items.splice(index, 1);
        }
        localStorage.setItem("cart_items", JSON.stringify(items));
    }

    calculateSubTotal = (item_details) => {
        let cart_items = this.state.cart_items;
        let subTotal = 0;
        for (var i = 0; i < cart_items.length; i++) {
            for (var j = 0; j < item_details.length; j++) {
                if (cart_items[i].item_id === item_details[j].item_id) {
                    subTotal += (cart_items[i].item_quantity * item_details[j].item_price);
                }
            }
        }
        subTotal = subTotal.toFixed(2);

        return subTotal;
    };

    clearCart = () => {
        localStorage.removeItem("cart_items");
        this.setState({
            cart_items: []
        });
    };

    render() {
        let redirectVar = null,
            cart_items = [],
            item,
            itemsRender = [],
            message = null;

        const tax = 9.25,
            discount = 5,
            delivery = 6,
            tip = 2;
        if (!localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/" />
        }

        if (this.state && this.state.cart_items.length > 0) {
            let cart_item_ids = this.state.cart_items.map(cart_item => cart_item.item_id);
            cart_items = this.state.res_items.filter(res_item => cart_item_ids.includes(res_item.item_id));
            this.calculateSubTotal(cart_items);
        }
        if (this.state.cart_items.length === 0) {
            message =
                [<center><Alert variant="warning">You haven't added any items to your cart. Please add your favorite items.</Alert><br />
                    <Button href="/home">Home</Button></center>
                ]
        }
        else {
            var subTotal = this.calculateSubTotal(cart_items);
            var total = ((subTotal * (100 + tax - discount) / 100) + delivery).toFixed(2);
            for (var i = 0; i < cart_items.length; i++) {
                let quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                let stateIndex = this.state.cart_items.findIndex((cart_item => cart_item.item_id === cart_items[i].item_id));
                let quantityOptions = quantity.map(number => {
                    return <option>{number}</option>;
                });
                item = (
                    <tr>
                        <td>{cart_items[i].item_name}</td>
                        <td align="center">$ {cart_items[i].item_price}</td>
                        <td align="center">
                            <Form.Control as="select" style={{ width: "30%" }} name={cart_items[i].item_id} onChange={this.onQuantityChange}>
                                {quantityOptions}
                            </Form.Control>
                        </td>
                        <td align="center">
                            <Button variant="link" name={cart_items[i].item_id}>
                                <img src={deleteIcon} width="15" name={cart_items[i].item_id} onClick={this.removeItem} />
                            </Button>
                        </td>
                        <td align="center">$ {cart_items[i].item_price * this.state.cart_items[stateIndex].item_quantity}</td>
                    </tr>
                );
                itemsRender.push(item);
            }
            var cartTable = (
                <div>
                    <Table style={{ width: "90%" }}>
                        <thead align="center">
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                            <th>Total Price</th>
                        </thead>
                        <tbody>
                            {itemsRender}
                            <br /><br /><br /><br />
                            <tr>
                                <td colSpan="4"><b>Sub Total</b></td>
                                <td align="center"><b>$ {subTotal}</b></td>
                            </tr>
                            <tr>
                                <td colSpan="4">Tax ({tax}%)</td>
                                <td align="center">$ {(subTotal * tax / 100).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4">Delivery Charges</td>
                                <td align="center">$ {delivery.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4">Discounts ({discount}%)</td>
                                <td align="center">$ {(subTotal * discount / 100).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4"><b>Total</b></td>
                                <td align="center"><b>$ {total}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="warning" onClick={this.clearCart}>Clear Cart</Button> &nbsp; &nbsp;
                    <Button variant="primary" href="/home">Back to Home</Button> &nbsp; &nbsp;
                    <Button variant="success">Proceed to Checkout</Button>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <Navigationbar /><br />
                <Container>
                    <h3>Your Cart</h3><br />
                    <center>
                        {message}
                        {cartTable}
                        <br /><br />
                    </center>
                </Container>

            </div>
        )
    }
}
export default Cart;