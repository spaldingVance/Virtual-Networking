import React, { Component } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/login.css";
import yellowc from "../assets/circle-yellow.svg"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../actions/index";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: "",
      userRole: "",
      redirect: false
    }
  }

  loginSubmit() {
    if (this.state.userName && this.state.userRole) {
    this.props.login(this.props.match.params.eventId, this.state.userName, this.state.userRole)
    } else alert("Please fill out a name and role")
  }

  updateName(event) {
    this.setState({userName: event.target.value}, () => {
      console.log(`userName changed to ${this.state.userName}`)
    });
  }

  updateRole(event) {
    this.setState({userRole: event.target.value}, () => {
      console.log(`userRole changed to ${this.state.userRole}`)
    });
  }
  

  render() {
    if (this.props.user.userName) {
      return <Redirect to={`/events/${this.props.match.params.eventId}`} />
    } else
    return (
      <Row>
        <Col lg="6">
            <h1 id="howdy">Howdy, Stranger</h1>
            <Form>
              <Form.Control
                id="userNameForm"
                className="tag-input shadow-sm"
                size="lg"
                type="text"
                placeholder="Name"
                value={this.state.userName}
                onChange={this.updateName.bind(this)}
              />
              <br />
              <Form.Control
                className="tag-input shadow-sm"
                size="lg"
                type="text"
                placeholder="Role (e.g. Mentor)"
                value={this.state.userRole}
                onChange={this.updateRole.bind(this)}
              />
              <br />
              <Button onClick={this.loginSubmit.bind(this)} id="tag-submit" size="lg">
                Join the Event
              </Button>
            </Form>
            <p className="login-text">
              Create your nametag.
              <br />
              <span id="login-italics">
                This will be the signature
                <br /> on your messages.
              </span>
            </p>
        </Col>
        <img id="yellowc" src={yellowc}/>
      </Row>
    );
  }
};

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
