import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
function MeetingMaker({ id, title }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card className="mb-3 mt-3">
            <Card.Body>
              <Card.Title>Learning High Performance Computing</Card.Title>
              <Card.Text>18.03.2022</Card.Text>
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
      </Row>

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
      {/* Modal To Add Feedback */}
    </Container>
  );
}

export default MeetingMaker;
