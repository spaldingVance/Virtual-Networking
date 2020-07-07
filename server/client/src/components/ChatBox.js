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

    this.state = {
      username: "",
      message: "",
      messages: [],
    };

    //how are we getting the name of the room? incoming props from parent component?
    this.socket = io("localhost:5000");

    this.socket.on("RECEIVE_MESSAGE", function (data) {
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
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message,
      });
      this.setState({ message: "" });
    };
  }
  render() {
    return (
      <Container className="m-0 p-0">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Card className="m-0 p-0">
              <Card.Body>
                <Card.Title>JavaScript Convo</Card.Title>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message) => {
                    return (
                      <div>
                        {message.author}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
              <div className="card-footer">
                {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/> */}

                <InputGroup>
                  <FormControl
                    placeholder="Message"
                    aria-label="Message"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      onclick={this.sendMessage}>
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
  }
}

export default ChatBox;
