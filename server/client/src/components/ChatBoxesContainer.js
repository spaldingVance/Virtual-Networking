import React, { Component } from "react";
import ChatBox from "./ChatBox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getJoinedConversations } from "../actions/index";
// styling imports
import { Row, Col, Container } from "react-bootstrap";
import "../styles/ChatBoxesContainer.css";

class ChatBoxesContainer extends Component {
  constructor(props) {
    super(props);
    // console.log("chatbox container constructor props=", props);
    this.setState = {
      conversations: this.props.conversations,
    };

    this.renderChatBoxes = this.renderChatBoxes.bind(this);
  }

  renderChatBoxes() {
    // console.log("inside render chatbox, this.props= ", this.props);

    let shortenedConversations = this.props.conversations.slice(0, 2);

    return shortenedConversations.map((conversation) => {
      return (
        <Col key={conversation._id} md={6}>
          <ChatBox
            conversationId={conversation._id}
            conversationName={conversation.conversationName}
            conversationUsers={conversation.users.length}
          />
        </Col>
      );
    });
  }

  // this component is the container for the chatboxes. The redux store state of current conversations is mapped to this component so that the correct chat box(es) will display
  render() {
    return (
      <Container>
        <Row>{this.renderChatBoxes()}</Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  // console.log("inside chatboxcontainer mapstate to props, state=", state);
  return { conversations: state.currentConversations };
}

//may not need this action creator in this component
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJoinedConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxesContainer);
