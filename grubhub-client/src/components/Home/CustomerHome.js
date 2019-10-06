import React, { Component } from 'react';
import axios from 'axios';
import backendServer from "../../webConfig";
import RestaurantCard from "./RestaurantCard";
import { InputGroup, FormControl, Button, DropdownButton, Dropdown, Alert, Col, Row } from 'react-bootstrap';

class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_input: "",
            noRecord: false
        });

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onCuisineSelect = this.onCuisineSelect.bind(this);
    }

    componentDidMount() {
        axios.get(`${backendServer}/grubhub/restaurant/restaurantsearch/_`)
            .then(response => {
                var cuisines = [];
                if (response.data) {
                    if (response.data[0].search_result === 'NO_RECORD') {
                        this.setState({
                            noRecord: true,
                            search_input: ""
                        });
                    }
                    else {
                        for (var i = 0; i < response.data.length; i++) {
                            if(!cuisines.includes(response.data[i].res_cuisine))
                            cuisines.push(response.data[i].res_cuisine)
                        }
                        this.setState({
                            restaurantList: response.data,
                            displayRestaurants: response.data,
                            cuisineList: cuisines
                        });
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log(error.response.data);
                }
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    onSearch = (e) => {
        e.preventDefault();
        if (this.state) {
            var searchInput = typeof this.state.search_input === "undefined" || this.state.search_input === "" ? "_" : this.state.search_input;
            axios.get(`${backendServer}/grubhub/restaurant/restaurantsearch/${searchInput}`)
                .then(response => {
                    var cuisines = [];
                    if (response.data) {
                        if (response.data[0].search_result === 'NO_RECORD') {
                            this.setState({
                                noRecord: true,
                                search_input: searchInput
                            });
                        }
                        else {
                            for (var i = 0; i < response.data.length; i++) {
                                if(!cuisines.includes(response.data[i].res_cuisine))
                                cuisines.push(response.data[i].res_cuisine)
                            }
                            this.setState({
                                restaurantList: response.data,
                                displayRestaurants: response.data,
                                cuisineList: cuisines,
                                noRecord: false
                            });
                        }
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                    }
                })
        }
    }

    onCuisineSelect = (e) => {
        var filteredList = this.state.restaurantList.filter(restaurant => restaurant.res_cuisine === e.target.text);
        this.setState({
            displayRestaurants: filteredList
        });
    }

    render() {
        var cuisineDropdown = null,
            restaurantCards = null,
            noRecordMessage = null;
        if (this.state && this.state.cuisineList) {
            cuisineDropdown = this.state.cuisineList.map(cuisine => {
                return (
                    <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
                )
            })
        }

        if (this.state && this.state.displayRestaurants) {
            restaurantCards = this.state.displayRestaurants.map(restaurant => {
                return (
                    <Col sm={3}>
                        <RestaurantCard restaurant={restaurant} />
                    </Col>
                );
            });
        }

        if (this.state && this.state.noRecord && this.state.search_input === "") {
            noRecordMessage = (
                <Alert variant="warning">
                    No Restaurants are available now. Please try again later.
                </Alert>
            );
        }
        else if(this.state && this.state.noRecord){
            noRecordMessage = (
            <Alert variant="warning">
                    No Results. Please try again.
                </Alert>
            );
        }
        else {
            noRecordMessage = null;
        }

        return (
            <div>
                <center><br /><br />
                    <h3>Search for restaurants with your favorite food!</h3>
                    <br />
                    <h4>Make a purchase of worth $100 or more and receive a discount of 20% and free delivery!</h4>
                    <br />
                    <form onSubmit={this.onSearch}>
                        <InputGroup style={{ width: '50%' }} size="lg">
                            <FormControl
                                placeholder="Pizza, Pasta, Noodles.."
                                aria-label="Search Restaurants"
                                aria-describedby="basic-addon2"
                                name="search_input"
                                onChange={this.onChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Search</Button>
                            </InputGroup.Append>
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Cuisine"
                                id="input-group-dropdown-2"
                            >
                                {cuisineDropdown}
                            </DropdownButton>
                        </InputGroup>
                    </form>
                    <br /><br />
                    {noRecordMessage}
                    <Row>{restaurantCards}</Row>
                </center>
            </div>
        )
    }
}

export default CustomerHome;
