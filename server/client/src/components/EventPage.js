import React from "react";

// components
import ChatBox from "./ChatBox";
import CurrentEventHeader from "./CurrentEventHeader";

// styling imports
import "../styles/App.css";
import { Row, Col, Container } from "react-bootstrap";

const EventPage = () => {
  return (
    <Row>
      <Col lg="4">
        <CurrentEventHeader />
      </Col>
      <Col lg="4">
        <ChatBox />
      </Col>
      <Col lg="4">
        <ChatBox />
      </Col>
    </Row>
  );
};

export default EventPage;
