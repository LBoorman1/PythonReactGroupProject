import React from 'react'
import MyApplicationFeedback from './MyApplicationFeedback';
import MyMeetingFeedback from './MyMeetingFeedback';

function MyFeedbackSelector(props) {
  if(props.feedbackType == "Meeting") {
      return(
        <MyMeetingFeedback/>
      );
  }
  else if (props.feedbackType == "Application") {
      return(
        <MyApplicationFeedback/>
      );
  }
}

export default MyFeedbackSelector