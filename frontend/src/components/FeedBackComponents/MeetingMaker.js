import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from 'axios';
function MeetingMaker({ id, title }) {
  const [openModal, setOpenModal] = useState(false);
  const [meetingData, setMeetingData] = useState([]);
  const [meetingId, setMeetingId] = useState();

  //writing request to return all meetings with userid of ?userID=${userID}
  const url = "http://localhost:8000/meetingView/?userID=4";
  

  //get the meetings every time the url changes
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { meetingData: response } = await axios({
          method: "GET",
          url: url,
        });
        setMeetingData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeetings();
  }, [url]);

  //function to make the cards from the meeting data
  const renderCard = (card, index) => {
    return (
      <Col md={6} key={index}>
        <Card className="mb-3 mt-3" >
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.date_time}</Card.Text>
            <Button
              onClick={() => {
                setMeetingId(card.id);
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
              <Input type="text" name="feedback" id="feedback" />
            </FormGroup>
            <FormGroup>
              <Label for="ratingSelect">Give the meeting a rating</Label>
              <Input type="select" name="select" id="ratingSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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
          <Button>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MeetingMaker;
