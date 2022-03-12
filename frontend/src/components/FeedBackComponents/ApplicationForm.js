import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
//testing
function ApplicationForm(props) {
  const url = "http://localhost:8000/applicationFeedbackView/";
  const [formValue, setformValue] = useState({
    feedback: '',
  });

  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.user.id;

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async() => {
    // store the states in the form data
    try {
      // make axios post request
      const response = await axios({
        method: "POST",
        url: url,
        data: {
          feedback: formValue.feedback,
          userID: userId,
        },
        headers: {
          'Content-Type': 'application/json',
      },
      });
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form>
        <FormGroup>
          <Label className="text-light" for="feedback">What can we do to improve this system?</Label>
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
