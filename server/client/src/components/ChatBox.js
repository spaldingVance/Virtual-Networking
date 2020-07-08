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
} from "react-bootstrap";
import "../styles/ChatBox.css";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    //so the state of this component will be for the one user using this application, so it pertains to them, their conversation, their name, their id, their current message but, the message array will be all messages (and include all users? tbd)
    //at this point messages is an array looking like [{socketid: , username: , message: , time: }, ...]
    this.state = {
      room: this.props.room,
      username: '',
      userId: '',
      message: '',
      messages: [],
    };

    //how are we getting the name of the room? incoming props from parent component?
    this.socket = io()

    this.socket.on('connect', () => {
      this.socket.emit('room', {conversationName: this.props.room, id: this.socket.id})
    } )

    this.socket.on("MESSAGE", function (data) {
      console.log('Chatbox receiving back message to add message to messages array. Data= ', data)
      addMessage(data);
    });

    const addMessage = (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    //this should eventually be this.props.username bc it's coming from redux store.
    // the message will be in the local state?
    this.sendMessage = (ev) => {
      console.log("Send button clicked, send message invoked");
      console.log('The sent message is:', this.state.message)
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        username: this.state.username,
        message: this.state.message,
        room: this.state.room
      });
      this.setState({ message: "" });
    };
    // this.sendMessage = (ev) => {
    //   ev.preventDefault();
    //   this.socket.emit("SEND_MESSAGE", {
    //     author: this.state.username,
    //     message: this.state.message,
    //   });
    //   this.setState({ message: "" });
    // };
    this.test = (event) => {
      event.preventDefault();
      console.log("Button connected");
      console.log("STATE MESSAGE", this.state.message)
      this.socket.emit('test', {
        testMessage: this.state.message,
        room: this.props.room
    });
    }
  
}


    // this.test = (e) => {
    //   e.preventDefault();
    //   console.log('button click')
    //   this.socket.emit('test', {
    //     testMessage: "Hiiiii!!!!"
    //   })
    // }
 // }

  render() {
    return (
      <Container className="m-0 p-0">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Card className="m-0 p-0 shadow-sm">
              <Card.Body>
                <Card.Title>JavaScript Convo</Card.Title>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message) => {
                    return (
                      <div>
                        {message.username}: {message.message}
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
                    onChange={event => {this.setState({message: event.target.value})}}
                  />
                  <InputGroup.Append>
                    <Button
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

export default ChatBox;
