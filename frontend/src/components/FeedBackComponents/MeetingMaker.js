import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
function MeetingMaker({ id, title }) {
  const [openModal, setOpenModal] = useState(false);

  const dummyMeetings = [
    {
      title: "Learning High Performance Computing",
      date: "18.03.2021",
      notes: "",
    },
    {
      title: "Software Engineering Meeting group 29",
      date: "23.02.2022",
      notes: "good progress",
    },
    {
      title: "Learning How To Make Cards Programatically",
      date: "28.02.2022",
      notes: "Notes aren't included yet lol",
    },
    {
      title: "Learning How To Make Cards Programatically",
      date: "28.02.2022",
      notes: "Notes aren't included yet lol",
    },
    {
      title: "Learning How To Make Cards Programatically",
      date: "28.02.2022",
      notes: "Notes aren't included yet lol",
    },
    {
      title: "Learning How To Make Cards Programatically",
      date: "28.02.2022",
      notes: "Notes aren't included yet lol",
    },
    {
      title: "Learning How To Make Cards Programatically",
      date: "28.02.2022",
      notes: "Notes aren't included yet lol",
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Col md={6}>
        <Card className="mb-3 mt-3" key={index}>
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.date}</Card.Text>
            <Button
              onClick={() => {
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
      <Row>{dummyMeetings.map(renderCard)}</Row>

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
