import React from "react";

// styling imports
import "../styles/ConversationList.css";

const ConversationList = () => {
  // TODO
  return (
    <div id="conversation-column">
      <h3>Join a Chat</h3>
      <ul className="conversation-list">
        <a href="#1">
          <li>Java Chat</li>
        </a>

        <a href="#2">
          <li>HTML Conversation</li>
        </a>

        <a href="#3">
          <li>JavaScript Room</li>
        </a>
        <a href="#4">
          <li>HTML Chat</li>
        </a>
        <a href="#1">
          <li>Random Convo whose name is really long and tedious jeez</li>
        </a>
      </ul>
    </div>
  );
};

export default ConversationList;
