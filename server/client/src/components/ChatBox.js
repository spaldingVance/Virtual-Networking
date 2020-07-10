import React, { Component } from "react";
import io from "socket.io-client";
import { leaveOneConversation } from "../actions/index";
import {
  Row,
  Col,
  Container,
  Card,
  InputGroup,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import "../styles/ChatBox.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    //need to get the name of the user, userid and message history from more mapStateToProps
    this.state = {
      message: "",
      messages: [],
      usersTyping: [],
    };

    this.socket = io();

    //this starts up the room socket connection when the component is initialized
    this.socket.on("connect", () => {
      this.socket.emit("JOIN_CONVERSATION", {
        conversationId: this.props.conversationId,
        userId: this.props.user._id,
        username: this.props.user.userName,
        conversationName: this.props.conversationName,
      });
    });

    //this receives back the message from server/index.js
    this.socket.on("MESSAGE", function (data) {
      addMessage(data);
    });

    //socket to receive information about other users typing
    this.socket.on("OTHER_USERS_TYPING", function (data) {
      setTyping(data);
    });

    //socket to receive information about when other users stop typing
    this.socket.on("OTHER_USERS_STOP_TYPING", function (data) {
      removeTyping(data);
    });

    //add typing user to state
    const setTyping = (data) => {
      let currentUsersTyping = this.state.usersTyping;
      if (!currentUsersTyping.includes(data.username)) {
        currentUsersTyping.push(data.username);
        this.setState({ usersTyping: currentUsersTyping });
      }
    };

    //remove typing user from state
    const removeTyping = (data) => {
      //users typing in state
      let currentUsersTyping = this.state.usersTyping;

      let userExists = currentUsersTyping.includes(data.username);

      if (userExists) {
        //remove user from typing in state
        let userIndex = currentUsersTyping.findIndex((user) => {
          return user === data.username;
        });

        currentUsersTyping.splice(userIndex, 1);
        this.setState({ usersTyping: currentUsersTyping });
      }
    };

    //this adds the message received back from server/index.js to this state's messages array
    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] });
      this.scrollToBottom();
    };

    // the message will be in the local state?
    this.sendMessage = (ev) => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        username: this.props.user.userName,
        message: this.state.message,
        room: this.props.conversationId,
        userId: this.props.user._id,
        role: this.props.user.role,
      });
      this.setState({ message: "" });
    };

    //this will send invoke the send message function if the enter key is pressed
    this.handleKeyPress = (event) => {
      if (event.charCode === 13) {
        //sending message
        this.sendMessage(event);

        //telling others that user has stopped typing
        this.socket.emit("USER_STOP_TYPING", {
          username: this.props.user.userName,
          room: this.props.conversationId,
        });
      } else {
        //send socket to announce user is typing
        let typing = false;
        let timeout = undefined;

        //timeout for typing
        const timeoutFunction = () => {
          typing = false;
          this.socket.emit("USER_STOP_TYPING", {
            username: this.props.user.userName,
            room: this.props.conversationId,
          });
        };

        if (typing == false) {
          typing = true;
          //socket to broadcast current user to other users
          this.socket.emit("USER_TYPING", {
            username: this.props.user.userName,
            room: this.props.conversationId,
          });

          //set timeout
          timeout = setTimeout(timeoutFunction, 3000);
        } else {
          clearTimeout(timeout);
          timeout = setTimeout(timeoutFunction, 3000);
        }
      }
    };

    //map users to typing div
    this.currentlyTypingUsers = () => {
      //users currently typing
      const typingUsers = this.state.usersTyping;

      //map users in typing array to div
      if (typingUsers.length === 1) {
        return <p>{typingUsers[0]} is typing...</p>;
      } else if (typingUsers.length === 2) {
        return (
          <p>
            {typingUsers[0]} and {typingUsers[1]} are typing...
          </p>
        );
      } else if (typingUsers.length > 2) {
        return <p>several users are typing...</p>;
      }
    };

    // exit conversation when the red X button is clicked. The conversation should be removed from the current conversations redux store and then the page should re-render and remove the clicked chatbox
    this.exitConversation = () => {
      //disconnect from socket
      this.socket.emit("LEAVE_CONVERSATION", {
        room: this.props.conversationId,
        userId: this.props.user._id,
        role: this.props.user.role,
        username: this.props.user.userName,
        conversationName: this.props.conversationName,
      });
      // get chatbox to disappear
      this.props.leaveOneConversation(this.props.conversationId);
    };

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.loadMessages = this.loadMessages.bind(this);

    this.findSizeOfConversation = (conversationName) => {
      let joinedConvo = this.props.event.conversations.find(
        (convo) => convo.conversationName === conversationName
      );
      return joinedConvo.users.length;
    };
  }

  componentDidMount() {
    // Activate the event listener
    this.setupBeforeUnloadListener();
  }

  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      this.props.logout(this.props.event._id, this.props.user._id);
      return this.exitConversation();
    });
  };

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  logoutUser() {
    // console.log("User ID = " + this.props.user._id);
    this.props.logout(this.props.event._id, this.props.user._id);
    if (this.props.logoutUser) {
      // console.log(this.props.logoutUser);
    }
    this.props.leaveAllConversations(); // need to empty the conversations array in global store
  }

  loadMessages() {
    if (this.state.messages) {
      return this.state.messages.map((message, index, array) => {
        return (
          <div
            key={index}
            ref={
              index === array.length - 1
                ? (event) => {
                    this.messagesEnd = event;
                  }
                : ""
            }>
            <div>
              <strong className="mr-1">
                {message.username} ({message.role})
              </strong>
              <strong></strong>
              <span>{message.time}</span>
            </div>
            <div>{message.message}</div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <Container className="m-0 p-0">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Card className="m-0 p-0 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <div className="chatbox-title">
                    {this.props.conversationName}
                    <span className="number-of-users">
                      {"  Users: " + this.findSizeOfConversation(this.props.conversationName)}
                    </span>
                  </div>
                </Card.Title>
                <Badge
                    pill
                    variant="danger"
                    className="close-button ml-4"
                    onClick={this.exitConversation}>
                    X
                  </Badge>
                <hr />
                <div className="messages">{this.loadMessages()}</div>
              </Card.Body>
              <div className="card-footer">
                <InputGroup>
                  <FormControl
                    placeholder="Message"
                    aria-label="Message"
                    aria-describedby="basic-addon2"
                    value={this.state.message}
                    onKeyPress={this.handleKeyPress}
                    onChange={(event) => {
                      this.setState({ message: event.target.value });
                    }}
                  />
                  <InputGroup.Append>
                    <Button
                      className="ml-2"
                      variant="outline-secondary"
                      onClick={this.sendMessage}>
                      Send
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                {/* show users typing  */}
                <div className="user-typing">{this.currentlyTypingUsers()}</div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ leaveOneConversation }, dispatch);
}

function mapStateToProps(state) {
  return {
    event: state.event,
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
