import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getConversations } from "../actions/index";

// styling imports
import "../styles/ConversationList.css";

class ConversationList extends Component {
  componentDidMount() {
    this.props.getConversations();
  }

  renderConversationList() {
    return this.props.conversations.map((conversation) => {
      return (
        <a href="#2">
          <li>{conversation.conversationName}</li>
        </a>
      );
    });
  }

  render() {
    console.log("The props for ConversationList is", this.props);

    return (
      <div id="conversation-column">
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
