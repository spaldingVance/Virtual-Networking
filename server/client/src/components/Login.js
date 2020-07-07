import React from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/login.css";
import yellowc from "../assets/circle-yellow.svg"

const Login = () => {
  // TODO
  return (
    <Row>
      <Col lg="6">
          <h1 id="howdy">Howdy, Stranger</h1>
          <Form>
            <Form.Control
              className="tag-input shadow-sm"
              size="lg"
              type="text"
              placeholder="Name"
            />
            <br />
            <Form.Control
              className="tag-input shadow-sm"
              size="lg"
              type="text"
              placeholder="Role (e.g. Mentor)"
            />
            <br />
            <Button id="tag-submit" size="lg">
              Join the Event
            </Button>
          </Form>
          <p className="login-text">
            Create your nametag.
            <br />
            <span id="login-italics">
              This will be the signature
              <br /> on your messages.
            </span>
          </p>
      </Col>
      <img id="yellowc" src={yellowc}/>
    </Row>
  );
};

export default Login;
