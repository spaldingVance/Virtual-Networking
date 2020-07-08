import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getEvents, selectEvent } from "../actions/index";
import "../styles/EventsList.css";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUsers } from "@fortawesome/free-solid-svg-icons";

class EventsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  renderEvents(data) {
    return (
      <Col lg={3} md={4} sm={6} xs={12} className="event-tile-column mb-4">
        <Container className="event-tile">
          <Row >
            <Col className="event-tile-top">
              <h3>{data.eventName}</h3>
            </Col>
          </Row>
          <div className="event-tile-bottom">

            <Row >
              <Col className="d-inline-flex justify-content-start align-items-baseline ">
                <FontAwesomeIcon icon={faUsers} />
                <p className="event-tile-numbers">{data.users.length}</p>
              </Col>
              <Col className="d-inline-flex justify-content-end align-items-baseline">
                <FontAwesomeIcon icon={faComments} />{" "}
                <p className="event-tile-numbers ">{data.conversations.length}</p>
              </Col>
            </Row>
          </div>
        </Container>
      </Col>
    );
  }

  render() {
    console.log(
      "The state that has been mapped to the EventsList component props is ",
      this.props
    );

    return (
      <div>
        <Container>
          <Row className="mb-4 justify-content-md-center">
            <h1>Attend an Event</h1>
          </Row>
          <Row>
          {this.props.events.map(this.renderEvents)}
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEvents, selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
