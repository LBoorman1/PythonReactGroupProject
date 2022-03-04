import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
function MeetingMaker() {
  const [openModal, setOpenModal] = useState(false);
  const [meetingData, setMeetingData] = useState([]);

  //state for sending post request to backend
  const [meetingID, setMeetingID] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(1);

  //get the meetings every time the url changes
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { data: response } = await axios({
          method: "GET",
          url: "http://localhost:8000/meetingView/?userID=5", //replace userID = 4 with userID=${userID} whenever we get the login sorted
        });
        setMeetingData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeetings();
  }, []);

  //function to make the cards from the meeting data
  const renderCard = (card, index) => {
    return (
      <Col md={6} key={index}>
        <Card className="mb-3 mt-3">
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.date_time}</Card.Text>
            <Button
              onClick={() => {
                setMeetingID(card.id);
                setOpenModal(true);
              }}
            >
              Feedback
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  //handles when the form input box changes
  const handleFeedbackChange = (event) => {
    setFeedback(
      event.target.value
    );
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  //function to send the meeting feedback data to the backend
  const meetingFeedback = async () => {
    try {
      // make axios post request
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/meetingFeedbackView/",
        data: {
          feedback: feedback,
          userID: 1,
          meetingID: meetingID,
          rating: rating, //will be replaced with ${userID}
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {/*This displays the cards for the meetings*/}
      <Row>{meetingData.map(renderCard)}</Row>

      <Modal show={openModal}>
        <Modal.Header>Meeting Feedback</Modal.Header>
        <Modal.Body>
          <form action="send this to django back-end with url containing user id???">
            <FormGroup>
              <Label for="feedback">How did you find this meeting?</Label>
              <Input
                type="text"
                name="feedback"
                id="feedback"
                onChange={handleFeedbackChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ratingSelect">Give the meeting a rating</Label>
              <Input
                type="select"
                name="select"
                id="ratingSelect"
                onChange={handleRatingChange}
              >
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
              </Input>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              meetingFeedback();
              setOpenModal(false);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MeetingMaker;
