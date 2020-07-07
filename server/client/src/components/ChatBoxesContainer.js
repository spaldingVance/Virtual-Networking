import React from "react";

// styling imports
import { Row, Col, Container } from "react-bootstrap";
import "../styles/ChatBoxesContainer.css";

const ChatBoxesContainer = () => {
  // TODO
  return (
    <Container>
      <Row>
        <Col md={6}>
          <div className="empty-chat-box">Chat box 1</div>
        </Col>
        <Col md={6}>
          <div className="empty-chat-box">Chat box 2</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBoxesContainer;
