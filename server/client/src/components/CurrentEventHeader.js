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
        <h1>{props.event ? props.event.eventName : "Event"}</h1>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  if (state.event) {
    return {
      event: state.event.conversations,
    };
  } else {
    return {};
  }
}

export default connect(mapStateToProps)(CurrentEventHeader);
