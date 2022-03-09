import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ApplicationForm from "./ApplicationForm";
import MeetingMaker from "./MeetingMaker";

function FormContainer(props) {
  if (props.feedbackType === "Meeting") {
    return <MeetingMaker />;
  } else {
    return <ApplicationForm />;
  }
}

export default FormContainer;
