import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getConversations, getJoinedConversations } from "../actions/index";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// styling imports
import "../styles/ConversationList.css";

class ConversationList extends Component {
  constructor(props) {
    super(props);

    //Javascript and HTML are hardcoded because getConversations is not pulling in the redux store conversations yet
    this.state = {
      conversations: [{ conversationName: "JavaScript", _id: 100 }, { conversationName: "HTML", _id: 200 }],
      joinedConversations: [], // by id
    };

    this.renderConversationList = this.renderConversationList.bind(this);
    this.handleJoinConversation = this.handleJoinConversation.bind(this);

  }

  componentDidMount() {
    this.props.getConversations(this.props.currentEvent);
  }

  handleJoinConversation(conversation) {

    console.log('conversation button clicked, conversation is =', conversation)
    const newJoinedConversations = this.state.joinedConversations.concat(conversation)
    this.setState({ joinedConversations: newJoinedConversations }, () => {
      this.props.getJoinedConversations(this.state.joinedConversations)
      console.log('state inside handleJoinConversation', this.state)
    });


  }

  checkJoinedStatus(conversation) {
    // this is where we check if the user is joined in the conversation
    // if joinedConversations in local state has an ID that matches the conversation
    // console.log("conversation is", conversation);
    // if (this.props.joinedConversations.includes(conversation._id)) {
    //   return ".joined";
    // }
  }

  renderConversationList() {
    return this.props.conversations.map((conversation) => {
      return (
        <a
          href="#2"
          key={`ConversationLink${conversation._id}`}

          className={this.checkJoinedStatus(conversation)}>
          <li onClick={event => { this.handleJoinConversation(conversation) }}>{conversation.conversationName}</li>
        </a>
      );
    });
  }

  render() {
    console.log("Inside render of Conversation List, this.props= ", this.props);

    return (
      <div id="conversation-column">
        <ul className="conversation-list">
          <a href="#">
            <li>Start your own convo!</li>
          </a>
        </ul>
        <Link to="/">
          <Button variant="outline-danger" id="leave-event">
            Leave Event
          </Button>
        </Link>
        <h3>Join a Chat</h3>
        <ul className="conversation-list">{this.renderConversationList()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    currentEvent: state.currentEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getConversations, getJoinedConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
