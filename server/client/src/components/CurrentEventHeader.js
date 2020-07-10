import React from "react";
import { connect } from "react-redux";

// styling imports
import "../styles/CurrentEventHeader.css";

const CurrentEventHeader = (props) => {
  // console.log("The current event is ", props);
  return (
    <div className='current-tile-container'>
      <div id="current-event-tile">
        <h2>You are attending</h2>
        <h1>{props.eventName}</h1>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  if (state.event) {
    // console.log("Inside currentEventHeader mapstatetoprops, state is", state);
    return {
      eventName: state.event.eventName || "Event",
    };
  } else {
    return {};
  }
}

export default connect(mapStateToProps)(CurrentEventHeader);
