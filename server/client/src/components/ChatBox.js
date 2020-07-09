import React, { Component } from "react";
import io from "socket.io-client";
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

    //so the state of this component will be for the one user using this application, so it pertains to them, their conversation, their name, their id, their current message but, the message array will be all messages (and include all users? tbd)
    //at this point messages is an array looking like [{socketid: , username: , message: , time: }, ...]
    this.state = {
      room: this.props.room,
      username: '',
      role: '',
      userId: '',
      message: '',
      messages: [],
    };

    //how are we getting the name of the room? incoming props from parent component?
    //this.socket = io("localhost:5000");
    this.socket = io();

    this.socket.on('connect', () => {
      this.socket.emit('room', {conversationName: this.props.room, id: this.socket.id})
    } )

    this.socket.on('JOIN_CONVERSATION')

    this.socket.on("MESSAGE", function (data) {
      console.log('Chatbox receiving back message to add message to messages array. Data= ', data)
      addMessage(data);
    });

    const addMessage = (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state);
    };

    //this should eventually be this.props.username bc it's coming from redux store.
    // the message will be in the local state?
    this.sendMessage = (ev) => {
      console.log("Send button clicked, send message invoked");
      console.log('The sent message is:', this.state.message)
      console.log('props', this.props.user.role)
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        //new
        username: this.props.user.userName,
        message: this.state.message,
        room: this.state.room,
        //new
        userId: this.props.user.userId, 
        //new
        role: this.props.user.role
      });
      this.setState({ message: "" });
    };


    this.handleKeyPress = (event) => {
      if (event.charCode === 13){
        console.log('inside if statement')
        this.sendMessage(event);
      }
    }
  
  }


  render() {
    return (
      <Container className="m-0 p-0">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Card className="m-0 p-0 shadow-sm">
              <Card.Body>
                <Card.Title>JavaScript Convo<Badge pill variant="danger" className="close-button ml-4">X</Badge></Card.Title>
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

//new
function mapStateToProps(state) {
  return { user: state.user };
}
//new
export default connect(mapStateToProps)(ChatBox);
// export default (ChatBox);
