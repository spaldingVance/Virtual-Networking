import React from "react";
import ChatBox from "./ChatBox";

// styling imports
import { Row, Col, Container } from "react-bootstrap";
import "../styles/ChatBoxesContainer.css";

const ChatBoxesContainer = () => {
  // TODO
  return (
    <Container>
      <Row>
        <Col md={6}>
          <ChatBox />
        </Col>
        <Col md={6}>
          <ChatBox />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBoxesContainer;
