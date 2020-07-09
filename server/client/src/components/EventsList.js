import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getEvents } from "../actions/index";
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
    document.getElementById('user-info').style.display = "none"
  }

  componentWillUnmount() {
    document.getElementById('user-info').style.display = "block"
  }

  renderEvents(data) {
    return (
      <Col lg={3} md={4} sm={6} xs={12} className="event-tile-column mb-4">
        <Link to={`/events/${data._id}/login`}>
          <Container className="event-tile px-3">
            <Row className="align-items-baseline">
              <Col className="d-inline-flex justify-content-start align-items-baseline">
                <div className="event-users">
                  <FontAwesomeIcon icon={faUsers} />{" "}
                  <p className="event-tile-numbers">{data.users.length}</p>
                </div>
              </Col>
              <Col className="d-inline-flex justify-content-end align-items-baseline">
                <div className="event-comments">
                  <FontAwesomeIcon icon={faComments} />{" "}
                  <p className="event-tile-numbers ">
                    {data.conversations.length}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="pt-3">
                <h3>{data.eventName}</h3>
              </Col>
            </Row>
          </Container>
        </Link>
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
            <h1 id="attend-event">Attend an Event</h1>
          </Row>
          <Row>{this.props.events.map(this.renderEvents)}</Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
