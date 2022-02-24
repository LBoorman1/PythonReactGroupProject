import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

function ApplicationForm(props) {
  const url = "http://localhost:8000/applicationFeedbackView/";
  const [formValue, setformValue] = useState({
    feedback: '',
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async() => {
    // store the states in the form data
    const feedbackFormData = new FormData();
    feedbackFormData.append("feedback", formValue.feedback)
    feedbackFormData.append("user", 2)
  
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: url,
        data: feedbackFormData,
      });
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form>
        <FormGroup>
          <Label for="feedback">What can we do to improve this system?</Label>
          <Input type="text" name="feedback" id="feedback" value={formValue.feedback} onChange={handleChange}/>
        </FormGroup>
        
        <Button
        active
        color="primary"
        size="lg"
        aria-pressed="false"
        href="#pablo"
        onClick={(e) => {
          /*functions that will be called when clicking meeting button */
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
      </Button>
      </form>
    </div>
  );
}

export default ApplicationForm;
