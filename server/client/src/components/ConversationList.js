import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getConversations,
  getJoinedConversations,
  logout,
  leaveAllConversations,
} from "../actions/index";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import PopUp from "./PopUp";

// styling imports
import "../styles/ConversationList.css";

class ConversationList extends Component {
  constructor(props) {
    super(props);

    //Javascript and HTML are hardcoded because getConversations is not pulling in the redux store conversations yet
    this.state = {
      active: false,
      eventId: this.props.match.params.eventId,
    };

    this.renderConversationList = this.renderConversationList.bind(this);
    this.handleJoinConversation = this.handleJoinConversation.bind(this);
  }

  componentDidMount() {
    // need to grab the data for the conversations
    this.getTheData();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
    this.logoutUser();
  }

  getTheData() {
    this.props.getConversations(this.state.eventId);
    // calling it every 500 ms helps performance
    this.intervalID = setTimeout(this.getTheData.bind(this), 500);
  }

  handleJoinConversation(conversation) {
    const foundConversationIndex = this.props.conversations.findIndex(
      (convo) => convo._id === conversation._id
    );

    console.log(
      "inside HANDLE JOIN CONVERSATION, this.props.conversations=",
      this.props.conversations
    );
    // console.log('inside HANDLE JOIN CONVERSATION, foundConversationname = ', foundConversationName)

    if (foundConversationIndex >= 0) {
      //show that they've already joined this conversation
      return window.alert(`You already joined this conversation`);
    }

    if (this.props.conversations.length === 2) {
      //show that they can't join another conversation without leaving another

      return window.alert(
        `You have already joined 2 conversations, please close a chatbox to join another conversation`
      );
    }

    if (foundConversationIndex === -1) {
      this.props.getJoinedConversations(conversation);
    }
  }

  checkJoinedStatus(conversationFromList) {
    // this is where we check if the user is joined in the conversation
    // if joinedConversations in local state has an ID that matches the conversation

    let joinedStatus = this.props.conversations.find((joinedConversation) => {
      return joinedConversation._id === conversationFromList._id;
    });

    if (joinedStatus !== undefined) {
      return "joined";
    }
  }

  logoutUser() {
    // console.log("User ID = " + this.props.user._id);
    this.props.logout(this.props.event._id, this.props.user._id);
    if (this.props.logoutUser) {
      // console.log(this.props.logoutUser);
    }

    this.props.leaveAllConversations(); // need to empty the conversations array in global store
  }

  popUpAppears() {
    // in case popup doesn't exist yet
    if (this.state.active) {
      // make convo popup div visible
      document.getElementById("convo-popup").style.display = "block";
    }
    this.setState({
      active: !this.state.active,
    });
  }

  renderConversationList() {
    // console.log(
    //   "In Render Conversation List, this.props.event are ",
    //   this.props.event
    // );

    if (this.props.event.conversations) {
      // need to sort the conversations by number of participants

      return this.props.event.conversations
        .sort((a, b) => b.users.length - a.users.length)
        .map((conversation) => {
          return (
            <a href="#2" key={`ConversationLink${conversation._id}`}>
              <li
                className={this.checkJoinedStatus(conversation)}
                onClick={(event) => {
                  this.handleJoinConversation(conversation);
                }}
                style={{ cursor: "pointer" }}>
                {conversation.conversationName} ({conversation.users.length}{" "}
                users)
              </li>
            </a>
          );
        });
    }
  }

  render() {
    // console.log("Inside render of Conversation List, this.props= ", this.props);

    if (!this.props.user.hasOwnProperty("userName")) {
      return <Redirect to={`/`} />;
    } else {
      return (
        <div id="conversation-column">
          {this.state.active && <PopUp />}
          <Button
            onClick={this.popUpAppears.bind(this)}
            variant="outline-primary"
            id="create-event"
            style={{ cursor: "pointer" }}>
            Create a Conversation
          </Button>
          <Button
            onClick={this.logoutUser.bind(this)}
            variant="outline-danger"
            id="leave-event"
            style={{ cursor: "pointer" }}>
            Leave Event
          </Button>
          <h3 id="join-convo">Join a Conversation</h3>
          <div className="conversation-list-container">
            <ul className="conversation-list">
              {this.renderConversationList()}
            </ul>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  if (state.event) {
    return {
      event: state.event,
      currentEvent: state.currentEvent,
      user: state.user,
      conversations: state.currentConversations,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getConversations, getJoinedConversations, logout, leaveAllConversations },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConversationList)
);
