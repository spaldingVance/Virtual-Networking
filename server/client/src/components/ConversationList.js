import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getConversations } from "../actions/index";

// styling imports
import "../styles/ConversationList.css";

class ConversationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedConversations: [], // by id
    };

    this.renderConversationList = this.renderConversationList.bind(this);
    this.handleJoinConversation = this.handleJoinConversation.bind(this);
    this.handleJoinConversation = this.handleJoinConversation.bind(this);
  }

  componentDidMount() {
    this.props.getConversations();
  }

  handleJoinConversation() {
    // send the conversation id and which room to the chatboxescontainer
  }

  checkJoinedStatus(conversation) {
    // this is where we check if the user is joined in the conversation
    // if joinedConversations in local state has an ID that matches the conversation
    console.log("conversation is", conversation);
    if (this.state.joinedConversations.includes(conversation._id)) {
      return ".joined";
    }
  }

  renderConversationList() {
    return this.props.conversations.map((conversation) => {
      return (
        <a
          href="#2"
          key={`ConversationLink${conversation._id}`}
          onClick={this.handleJoinConversation}
          className={this.checkJoinedStatus(conversation)}>
          <li>{conversation.conversationName}</li>
        </a>
      );
    });
  }

  render() {
    console.log("The props for ConversationList is", this.props);

    return (
      <div id="conversation-column">
        <ul className="conversation-list">
          <a href="#">
            <li>Start your own chat!</li>
          </a>
        </ul>
        <h3>Join a Chat</h3>
        <ul className="conversation-list">{this.renderConversationList()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { conversations: state.conversations };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
