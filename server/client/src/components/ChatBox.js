import React, { Component } from "react";
import io from "socket.io-client";
import { user } from "../actions/index";
import {
  Row,
  Col,
  Container,
  Card,
  InputGroup,
  FormControl,
  Button,
  Badge
} from "react-bootstrap";
import "../styles/ChatBox.css";
import { connect } from "react-redux";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    console.log('inside chatbox constructor, props is=', this.props)
    const roomName = this.props.conversation[0].conversationName;
    const roomId = this.props.conversation[0]._id;

    //so the state of this component will be for the one user using this application, so it pertains to them, their conversation, their name, their id, their current message but, the message array will be all messages (and include all users? tbd)
    //at this point messages is an array looking like [{socketid: , username: , message: , time: }, ...]

    //need to get the name of the user, userid and message history from more mapStateToProps
    this.state = {
      room: roomName,
      username: 'Danielle',
      role: 'Student',
      userId: '',
      message: '',
      messages: [],
    };

    //how are we getting the name of the room? incoming props from parent component?
    //this.socket = io("localhost:5000");
    this.socket = io();

    //this starts up the room socket connection when the component is initialized
    this.socket.on('connect', () => {
      console.log('inside this.socket.on connect, this.state.room=', this.state.room)
      this.socket.emit('room', {conversationId: this.props.conversation._id,})
    } )

    //this receives back the message from server/index.js 
    this.socket.on("MESSAGE", function (data) {
      console.log('Chatbox receiving back message to add message to messages array. Data= ', data)
      addMessage(data);
    });

    //this adds the message received back from server/index.js to this state's messages array
    const addMessage = (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state);
    };

   
    // the message will be in the local state?
    this.sendMessage = (ev) => {
      console.log("Send button clicked, send message invoked");
      console.log('The sent message is:', this.state.message)
      console.log('props', this.props.user.role)
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        username: this.props.user.userName,
        message: this.state.message,
        room: this.props.conversation._id,
        userId: this.props.user._id,
        role: this.props.user.role
      });
      this.setState({ message: "" });
    };

    //this will send invoke the send message function if the enter key is pressed
    this.handleKeyPress = (event) => {
      if (event.charCode === 13){
        console.log('inside if statement')
        this.sendMessage(event);
      }
    }

    //TO DO: exit conversation when the red X button is clicked. The conversation should be removed from the current conversations redux store and then the page should re-render and remove the clicked chatbox 
    this.exitConversation = () => {

    }
  
  }


  render() {
    return (
      <Container className="m-0 p-0">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Card className="m-0 p-0 shadow-sm">
              <Card.Body>
                <Card.Title>{this.state.room}<Badge pill variant="danger" className="close-button ml-4" onClick={this.exitConversation}>X</Badge></Card.Title>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message) => {
                    return (
                      <div>
                        <div><strong className="mr-1">{message.username} ({message.role})</strong><strong></strong><span>{message.time}</span></div>
                        <div>{message.message}</div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
              <div className="card-footer">
                <InputGroup>
                  <FormControl
                    placeholder="Message"
                    aria-label="Message"
                    aria-describedby="basic-addon2"
                    value={this.state.message}
                    onKeyPress={this.handleKeyPress}
                    onChange={event => {this.setState({message: event.target.value})}}
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
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
}


function mapStateToProps(state) {
  console.log('inside mapstatetoprops chatbox, state=', state)
  return { conversations: state.conversations, 
          user: state.user };
}

export default connect(mapStateToProps)(ChatBox);
