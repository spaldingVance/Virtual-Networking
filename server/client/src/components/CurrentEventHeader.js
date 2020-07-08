import React from "react";
import { connect } from "react-redux";

// styling imports
import "../styles/CurrentEventHeader.css";

const CurrentEventHeader = (props) => {
  console.log("The current event is ", props.currentEvent);
  return (
    <div>
      <div id="current-event-tile">
        <h2>You are attending</h2> <h1>Event Name Here</h1>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { currentEvent: state.currentEvent };
}

export default connect(mapStateToProps)(CurrentEventHeader);
