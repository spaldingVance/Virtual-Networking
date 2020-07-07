import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { fetchEvents, selectEvent } from '../actions/index';
import "../styles/EventsList.css";
import { Row, Col, Container } from "react-bootstrap";

class EventsList extends Component {

  componentDidMount() {
  //  this.props.fetchEvents();
    
 }

  renderEvents() {
    
    return (
      <Col md={3}>
        <Container className="m-3">
        <div className="event-tile ">
        </div>
        </Container >
      </Col>
    );
  }

  render() {
    return (

      <div>
        <Container>
          <Row className="justify-content-md-center"> <h1>Attend an Event</h1></Row>
      
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
