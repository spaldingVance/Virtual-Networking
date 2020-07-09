import React, { Component } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/login.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createConversation } from "../actions/index";
import { Redirect, Link } from "react-router-dom";

class PopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversationName: ""
  }
}

  conversationSubmit() {
    if (this.state.conversationName) {
        this.props.createConversation("convoName", "eventID");
      } else alert("Please fill out a conversation title");
  };

  updateConversationName(event) {
    this.setState({ conversationName: event.target.value }, () => {
      console.log(`convoName changed to ${this.state.conversationName}`);
    });
  };

  render() {
      return (
        <Row>
          <Col lg="6">
            <h1 id="create-convo">Create a New Convo</h1>
            <Form>
              <Form.Control
                id="userNameForm"
                className="tag-input shadow-sm"
                size="lg"
                type="text"
                placeholder="Name"
                value={this.state.conversationName}
                onChange={this.updateConversationName.bind(this)}
              />
              <br />
              <Button
                onClick={this.conversationSubmit.bind(this)}
                id="convo-submit"
                size="lg">
                Start New Conversation
              </Button>
            </Form>
          </Col>
        </Row>
      );
    }   
}

function mapStateToProps(state) {
  return { currentEvent: state.event };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);