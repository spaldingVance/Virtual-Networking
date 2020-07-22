import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

// components
import CurrentEventHeader from "./CurrentEventHeader";
import ConversationList from "./ConversationList";
import ChatBoxesContainer from "./ChatBoxesContainer";

// styling imports
import "../styles/EventPage.css";
import { Row, Col } from "react-bootstrap";

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();

    // this starts up the room socket connection when the component is initialized
    this.socket.on("connect", () => {
      this.socket.emit("JOIN_EVENT", {
        eventId: this.props.event._id,
        user: this.props.user,
      });
    });
  }
  render() {
    console.log("event is", this.props.event);

    return (
      <Row className='event-page-row'>
        <Col lg={4}>
          <Row className='justify-content-md-center'>
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
  }
}

function mapStateToProps(state) {
  return { event: state.event, user: state.user };
}

export default connect(mapStateToProps)(EventPage);
