import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { fetchEvents, selectEvent } from '../actions/index';
import "../styles/EventsList.css";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faUsers } from '@fortawesome/free-solid-svg-icons'

class EventsList extends Component {

  componentDidMount() {
  //  this.props.fetchEvents();
    
 }

  renderEvents() {
    
    return (
      <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
        <Container className="event-tile px-3">
          <Row>
            <Col className="pt-3">
            {/* events.eventName */}
            {/* 900 Roboto for All Sans Serif */}
            <h3>THIS IS A LONG, VERY LONG EVENT NAME</h3>
            </Col>
          </Row>
          <Row className="align-items-baseline">
            <Col className="d-inline-flex justify-content-start align-items-baseline">
            {/* For each participant, reduce to a number */}
            <FontAwesomeIcon icon={faUsers} /> <p className="event-tile-numbers">23</p>
            </Col>
            <Col className="d-inline-flex justify-content-end align-items-baseline">
            {/* For each conversation, reduce to a number */}
            <FontAwesomeIcon icon={faComments} /> <p className="event-tile-numbers ">2</p>
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }

  render() {
    return (

      <div>
        <Container>
          <Row className="mb-4 justify-content-md-center"> <h1>Attend an Event</h1></Row>
      
        {/* {this.props.events.map(this.renderEvents)} */}
        {/* Did this 8 times */}
        <Row>{this.renderEvents()}{this.renderEvents()}{this.renderEvents()}{this.renderEvents()}{this.renderEvents()}{this.renderEvents()}{this.renderEvents()}{this.renderEvents()}</Row>

        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
//  return { events: state.events }; 
}

function mapDispatchToProps(dispatch) {
//  return bindActionCreators({ fetchEvents, selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
