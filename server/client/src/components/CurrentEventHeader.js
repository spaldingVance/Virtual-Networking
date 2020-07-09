import React from "react";
import { connect } from "react-redux";

// styling imports
import "../styles/CurrentEventHeader.css";

const CurrentEventHeader = (props) => {
  console.log("The current event is ", props);
  return (
    <div>
      <div id="current-event-tile">
        <h2>You are attending</h2>
        <h1>
          {props.conversations[0]
            ? props.conversations[0].conversationName
            : "Event"}
        </h1>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
  };
}

export default connect(mapStateToProps)(CurrentEventHeader);
