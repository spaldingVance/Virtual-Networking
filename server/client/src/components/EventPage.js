import React from "react";


// components
import CurrentEventHeader from "./CurrentEventHeader";
import ConversationList from "./ConversationList";
import ChatBoxesContainer from "./ChatBoxesContainer";

// styling imports
import "../styles/EventPage.css";
import { Row, Col, Container } from "react-bootstrap";

const EventPage = () => {
  return (
    <Row className="event-page-row">
      <Col lg={4}>
        <Row className="justify-content-md-center">
          <CurrentEventHeader />
        </Row>
        <Row>
          <ConversationList />
        </Row>
      </Col>
      <Col lg={8}>
        <ChatBoxesContainer />
      </Col>
    </Row>
  );
};

export default EventPage;




