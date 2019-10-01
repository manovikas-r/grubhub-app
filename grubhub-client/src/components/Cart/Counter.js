import React, { Component } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import deleteIcon from "../../images/delete.png";

class Counter extends Component {
  render() {
    return (
      <Row>
        <Col sm={2}>
          <Card.Title>{this.props.menu_item.item_name}</Card.Title>
        </Col>
        <Col sm={2}>
          <Button
            variant="light"
            onClick={() => this.props.onDecrement(this.props.menu_item)}
          >
            -
          </Button>
        </Col>
        <Col sm={2}>
          <span>{this.props.menu_item.item_quantity}</span>
        </Col>
        <Col sm={2}>
          <Button
            variant="light"
            onClick={() => this.props.onIncrement(this.props.menu_item)}
          >
            +
          </Button>
        </Col>

        <Col sm={2}>
          <Button
            variant="outline"
            onClick={() => this.props.onDelete(this.props.menu_item.item_id)}
          >
            <img
              width="30"
              height="30"
              src={deleteIcon}
            ></img>
          </Button>
        </Col>
      </Row>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.item.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.item;
    console.log(this.props.item.value);
    return value;
  }
}

export default Counter;