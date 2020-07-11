import React, { Component } from "react";
import ChatBox from "./ChatBox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getJoinedConversations } from "../actions/index";
// styling imports
import { Row, Col, Container, Card } from "react-bootstrap";
import "../styles/ChatBoxesContainer.css";

class ChatBoxesContainer extends Component {
  constructor(props) {
    super(props);
    // console.log("chatbox container constructor props=", props);
    this.state = {
      conversations: this.props.conversations,
      enteredConvo: false,
    };

    this.renderChatBoxes = this.renderChatBoxes.bind(this);
    this.renderGreyBoxes = this.renderGreyBoxes.bind(this);
  }

  // componentDidMount() {
  //   document.getElementById("grey-box-id").style.display = "block";
  // }
  //  componentDidUpdate() {
  //    if (this.props.conversations.length === 0) {
  //      this.setState({enteredConvo: true})
  //    }
  //  }

  // componentWillUnmount() {
  //   document.getElementById("grey-box-id").style.display = "none";
  // }

  renderGreyBoxes() {
    return (
      <div className="grey-box-div" id="grey-box-id">
        <Col key={1} md={6} className="column">
          <Container className="m-0 p-0">
            <Row className="m-0 p-0">
              <Col className="m-0 p-0">
                <Card className="m-0 p-0 shadow-sm empty-chat-box">
                  <Card.Body>
                    <div className="empty-chat-div">
                      Join a conversation to get started... or create your own!
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col key={2} md={6} className="column">
          <Container className="m-0 p-0">
            <Row className="m-0 p-0">
              <Col className="m-0 p-0">
                <Card className="m-0 p-0 shadow-sm empty-chat-box">
                  <Card.Body>
                    <div className="empty-chat-div">...Why not two?</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </div>
    );
  }

  renderChatBoxes() {
    // console.log("inside render chatbox, this.props= ", this.props);
    let shortenedConversations = this.props.conversations.slice(0, 2);

    return shortenedConversations.map((conversation) => {
      return (
        <Col key={conversation._id} md={6}>
          <ChatBox
            conversationId={conversation._id}
            conversationName={conversation.conversationName}
            conversationUsers={conversation.users.length}
          />
        </Col>
      );
    });
  }

  // this component is the container for the chatboxes. The redux store state of current conversations is mapped to this component so that the correct chat box(es) will display
  render() {
    if (this.props.conversations.length !== 0) {
      return (
        <Container>
          <Row>{this.renderChatBoxes()}</Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>{this.renderGreyBoxes()}</Row>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  // console.log("inside chatboxcontainer mapstate to props, state=", state);
  return { conversations: state.currentConversations };
}

//may not need this action creator in this component
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJoinedConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxesContainer);
