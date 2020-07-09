import React, {Component} from "react";
import muzeLogo from "../assets/muze-logo.svg";
import "../styles/header.css";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.user) {
    return (
      <div id="header">
        <img id="muze" src={muzeLogo} alt="Muze Logo" />
        <div id="user-info">
          <div id="user-words">
            <p id="user-name">{this.props.user.userName}</p>
            <p id="user-byline">{this.props.user.role}</p>
          </div>
          <div id="user-circle">
            <p>{this.props.user.userName ? this.props.user.userName[0] : ""}</p>
          </div>
        </div>
      </div>
    );
  }
  }
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Header);

