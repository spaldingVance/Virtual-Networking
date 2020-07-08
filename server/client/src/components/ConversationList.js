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

  // TODO
  render() {
    console.log("The props for ConversationList is", this.props);
    return (
      <div id="conversation-column">
        <h3>Join a Chat</h3>
        <ul className="conversation-list">
          <a href="#1">
            <li>Java Chat</li>
          </a>

          <a href="#2">
            <li>HTML Conversation</li>
          </a>

          <a href="#3">
            <li>JavaScript Room</li>
          </a>
          <a href="#4">
            <li>HTML Chat</li>
          </a>
          <a href="#1">
            <li>Random Convo whose name is really long and tedious jeez</li>
          </a>
        </ul>
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
