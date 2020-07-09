import React, { Component } from "react";
import ChatBox from "./ChatBox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getJoinedConversations } from "../actions/index";
// styling imports
import { Row, Col, Container } from "react-bootstrap";
import "../styles/ChatBoxesContainer.css";

class ChatBoxesContainer extends Component {
  // TODO
  constructor(props) {
    super(props)
    console.log('chatbox container constructor props=', props)
    this.setState = {
      conversations: this.props.conversations
    }

    this.renderChatBoxes = this.renderChatBoxes.bind(this)

  }





  renderChatBoxes() {
    console.log('inside render chatbox, this.props= ', this.props)
    return this.props.conversations.map(conversation => {
      return (
        <Col key={conversation._id} md={6}>
          <ChatBox conversation={conversation} />
        </Col>
      )
    })
  }

  render() {
    return (
      <Container>
        <Row>
          {this.renderChatBoxes()}
        </Row>
      </Container>
    );
  };
}


function mapStateToProps(state) {
  console.log('inside chatboxcontainer mapstate to props, state=', state)
  return { conversations: state.currentConversations };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJoinedConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxesContainer);