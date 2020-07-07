import React from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/login.css"


const Login = () => {
  // TODO
  return (
    <Row>
      <Col lg="6">
        <h1>Howdy, Stranger</h1>
        <Form>
        <Form.Control className="tag-input" size="lg" type="text" placeholder="Name" />
        <br />
        <Form.Control className="tag-input" size="lg" type="text" placeholder="Byline" />
        <br />
        <Button id="tag-submit" size="lg">Join the Event</Button>
        </Form>
        <p className="login-text">Create your nametag.<br/><span id="login-italics">This will be the signature<br /> on your messages.</span></p>
      </Col>
    </Row>
  );
};

export default Login;
