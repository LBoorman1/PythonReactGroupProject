import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ApplicationForm from "./ApplicationForm";
import MeetingForm from "./MeetingForm";

function FormContainer(props) {
  if (props.feedbackType === "Meeting") {
    return <MeetingForm />;
  } else {
    return <ApplicationForm />;
  }
}

export default FormContainer;
