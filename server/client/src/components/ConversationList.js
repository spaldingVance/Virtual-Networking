import React from "react";

// styling imports
import "../styles/ConversationList.css";

const ConversationList = () => {
  // TODO
  return (
    <div id="conversation-column">
      <h3>Join a Convo</h3>
      <ul className="conversation-list">
        <li>Java Convo</li>
        <li>HTML Convo</li>
        <li>JavaScript Convo - new</li>
        <li>Django Convo - new</li>
        <li>Random Convo whose name is really long and tedious jeez</li>
      </ul>
    </div>
  );
};

export default ConversationList;
