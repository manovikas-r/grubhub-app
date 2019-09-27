import React, { Component } from 'react';
import { Card, Button, InputGroup, Form, FormControl } from 'react-bootstrap';
const axios = require("axios");

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            image: "http://localhost:3001/grubhub/useruploads/" + localStorage.getItem("user_id")
        };
        this.onUpload = this.onUpload.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            file: e.target.files[0],
            image: this.state.image
        });
    }

    onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        axios.post("http://localhost:3001/grubhub/useruploads/" + localStorage.getItem("user_id"), formData, uploadConfig)
            .then(response => {
                alert("Image uploaded successfully!");
            })
            .catch(err => {
                console.log("Error");
            });
    }

    render() {
        let title = localStorage.getItem("name");
        return (
            <div>
                <center>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.state.image} />
                        <Card.Body>
                            <Card.Title><h3>{title}</h3></Card.Title>

                        </Card.Body>
                    </Card>
                    <form onSubmit={this.onUpload}><br /><br /><br />
                        <input type="file" name="image" onChange={this.onChange} /><br />
                        <Button type="submit" variant="primary">Upload</Button>
                    </form>
                </center>
            </div>
        )
    }
}

export default ImageUploader;