import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { fetchEvents, selectEvent } from '../actions/index';
import "../styles/App.css";
import { Row, Col, Container } from "react-bootstrap";

class EventsList extends Component {

  componentDidMount() {
  //  this.props.fetchEvents();
    
 }

  renderEvents() {
    
    return (
      <Col md={3}>

        <img className="img-fluid mx-auto d-block py-2 " src="https://via.placeholder.com/250?text=Product+Image"></img>
  
      </Col>
    );
  }

  render() {
    return (

      <div>
        <Container>
          <Row className="justify-content-md-center"> <h1>Events</h1></Row>
      
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
