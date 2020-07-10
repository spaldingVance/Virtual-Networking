import React, { Component } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/login.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createConversation } from "../actions/index";
import "../styles/PopUp.css";

class PopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversationName: "",
    };
  }

  conversationSubmit() {
    console.log(this.props.currentEvent._id);
    if (this.state.conversationName && this.props.currentEvent) {
      // if there's a convo name, create conversation with that name
      this.props.createConversation(
        this.props.currentEvent._id,
        this.state.conversationName
      );

      // reset conversation name to be nothing
      this.setState({ conversationName: "" });
      // then disappear
      document.getElementById("convo-popup").style.display = "none"
    } else alert("Please fill out a conversation title");

  }

  updateConversationName(event) {
    this.setState({ conversationName: event.target.value }, () => {
      console.log(`convoName changed to ${this.state.conversationName}`);
    });
  }

  render() {
    return (
      <div id="convo-popup">
        <Row>
          <Col>
            <h1 id="create-convo">Create a New Convo</h1>
            <Form>
              <Form.Control
                id="conversationNameForm"
                className="tag-input shadow-sm"
                size="lg"
                type="text"
                placeholder="Conversation Name"
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
      </div>
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
