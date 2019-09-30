import React, { Component } from "react";
import { Form, Col, Row, Container, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

class MenuItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_sections: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.getSections();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    getSections = () => {
        axios.get("http://localhost:3001/grubhub/menu/sections/" + localStorage.getItem("user_id"))
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

    onSubmit = e => {
        e.preventDefault();
        const data = {
            user_id: localStorage.getItem("user_id"),
            item_name: this.state.item_name,
            item_description: this.state.item_description,
            item_price: this.state.item_price,
            menu_section_name: this.state.menu_section_name || this.state.menu_sections[0].menu_section_name,
            item_image: this.state.item_image
        };

        axios.post("http://localhost:3001/grubhub/menu/items", data)
            .then(response => {
                this.setState({
                    message: response.data.status
                });
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        message: err.response.data
                    });
                }
            });
    };

    onImageChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileText: e.target.files[0].name
        });
    }

    onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("itemimage", this.state.file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        axios.post("http://localhost:3001/grubhub/uploads/item/" + this.state.item_id, formData, uploadConfig)
            .then(response => {
                alert("Image uploaded successfully!");
                this.setState({
                    fileText: "Choose file...",
                    item_image: response.data
                });
            })
            .catch(err => {
                console.log("Error");
            });
    }

    render() {
        let message = null;
        if (this.state.message === "ITEM_ADDED") {
            message = <Alert variant="success">Item Added Succesfully</Alert>;
        }
        else if (this.state.message === "ITEM_EXISTS") {
            message = <Alert variant="warning">A item with name {this.state.item_name} already exists</Alert>;
        }

        let section_options = null;
        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            section_options = this.state.menu_sections.map(menu_section => {
                return (
                    <option>{menu_section.menu_section_name}</option>
                );
            })
        }

        var imageSrc,
            fileText = this.state.fileText || "Choose image..";
        if (this.state) {
            imageSrc = "http://localhost:3001/grubhub/images/item/" + this.state.item_image;
        }
        return (
            <Container className="justify-content">
                <Row>
                    <Col xs={6} md={4}>
                        <center>
                            <br/><br/>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={imageSrc} />
                            </Card>
                            <form onSubmit={this.onUpload}><br /><br /><br />
                                <div class="custom-file" style={{ width: "80%" }}>
                                    <input type="file" class="custom-file-input" name="image" accept="image/*" onChange={this.onImageChange} required />
                                    <label class="custom-file-label" for="image" style={{"text-align":"left"}}>{fileText}</label>
                                </div><br /><br />
                                <Button type="submit" variant="primary">Upload</Button>
                            </form>
                        </center>
                    </Col>
                    <Col>
                    <br/><br/>
                        <h3>Add New Menu Item</h3><br />
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="item_name">
                                <Form.Label column sm="3">
                                    Item Name:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_name" placeholder="Enter Item Name.." onChange={this.onChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_description">
                                <Form.Label column sm="3">
                                    Item Description:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_description" placeholder="Enter Item Description.." onChange={this.onChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_price">
                                <Form.Label column sm="3">Price: </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_price" placeholder="Enter Price.." onChange={this.onChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_section">
                                <Form.Label column sm="3">Section:</Form.Label>
                                <Col sm="4">
                                    <Form.Control as="select" style={{ width: "15rem" }} onChange={this.onChange} name="menu_section_name">
                                        {section_options}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Button type="sumbit">Add Item</Button>
                        </Form>
                        {message}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MenuItems;