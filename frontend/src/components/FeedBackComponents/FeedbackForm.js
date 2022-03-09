import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormContainer from "./FormContainer";

function FeedbackForm(props) {
  const [feedbackType, setFeedbackType] = useState("Meeting");

  return (
    /*Button to decide whether you want to give application feedback
        or meeting feedback*/
    <Container className="pt-3">
      <Button
        active={feedbackType === "Meeting"}
        color="primary"
        size="lg"
        aria-pressed="false"
        href="#pablo"
        onClick={(e) => {
          /*functions that will be called when clicking meeting button */
          setFeedbackType("Meeting");
          e.preventDefault();
        }}
      >
        Meeting Feedback
      </Button>
      <Button
        active={feedbackType === "Application"}
        color="primary"
        size="lg"
        aria-pressed="true"
        href="#pablo"
        onClick={(e) => {
          /*functions that will be called when clicking application button */
          setFeedbackType("Application");
          e.preventDefault();
        }}
      >
        Application Feedback
      </Button>

      <FormContainer feedbackType={feedbackType} />
    </Container>
  );
}

export default FeedbackForm;
