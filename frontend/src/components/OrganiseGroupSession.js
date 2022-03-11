import DateTimePicker from "react-datetime-picker";
import React, { useState } from "react";
import { Button, Card, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const OrganiseGroupSession = () => {
  const [dateStart, setDateStart] = useState(new Date());
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const user_data = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    if (meetingTitle == "") {
      setOpenModal(true);
    } else {
      try {
        // make axios post request
        const response = await axios({
          method: "POST",
          url: "http://localhost:8000/groupMeetingsView/",
          data: {
            meetingTitle: meetingTitle,
            meetingNotes: meetingNotes,
            dateStart: dateStart,
            userID: 2, //user_data.user.id
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      setMeetingNotes("");
      setMeetingTitle("");
    }
  };

  const handleTitleChange = (event) => {
    setMeetingTitle(event.target.value);
  };
  const handleNotesChange = (event) => {
    setMeetingNotes(event.target.value);
  };

  return (
    <div className="organise_group_session sec__one">
      <br></br>

      <br></br>
      <Card>
        <h1>Set up group session:</h1>

        <form>
          <FormGroup>
            <Label for="meetingTitle">Group Meeting Title</Label>
            <Input
              type="text"
              name="meetingTitle"
              id="meetingTitle"
              value={meetingTitle}
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="meetingNotes">Group Meeting Notes</Label>
            <Input
              type="text"
              name="meetingNotes"
              value={meetingNotes}
              id="meetingNotes"
              onChange={handleNotesChange}
            />
          </FormGroup>
          {/* <h3>Select start time:</h3> */}
          <Label>Select start time</Label>
          <br></br>
          <DateTimePicker
            onChange={(d) => setDateStart(d)}
            value={dateStart}
            showTimeSelect
            timeFormat="HH"
            timeIntervals={60}
            dateFormat="MMMM Do YYYY, h a"
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </form>
      </Card>

      <Modal show={openModal}>
        <ModalBody>Please Enter a meeting title!</ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default OrganiseGroupSession;
