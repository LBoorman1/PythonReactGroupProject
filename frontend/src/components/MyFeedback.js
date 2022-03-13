import React, { useState } from "react";
import { Container } from "reactstrap";
import { Button } from "react-bootstrap";
import MyFeedbackSelector from "./FeedBackComponents/MyFeedbackSelector";

const MyFeedback = () => {

  const [feedbackType, setFeedbackType] = useState("Meeting");
  

  return (
    <div className="give_feedback sec__one">
      <h1> My Feedback </h1>

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

        <MyFeedbackSelector feedbackType={feedbackType} />
      </Container>
    </div>
  );
};

export default MyFeedback;
