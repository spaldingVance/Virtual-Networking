import React from "react";

// components
import ChatBox from "./ChatBox";
import CurrentEventHeader from "./CurrentEventHeader";
import ConversationList from "./ConversationList";

// styling imports
import "../styles/App.css";
import { Row, Col, Container } from "react-bootstrap";

const EventPage = () => {
  return (
    <Row>
      <Col lg="4">
        <Row className="justify-content-md-center">
          <CurrentEventHeader />
        </Row>
        <Row>
          <ConversationList />
        </Row>
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
