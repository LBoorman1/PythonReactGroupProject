import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from 'axios';

function MyApplicationFeedback() {
  const [applicationFeedback, setApplicationFeedback] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.user.id;

  useEffect(() => {
    const fetchApplicationFeedback = async () => {
      try {
        const { data: response } = await axios({
          method: "GET",
          url: `http://localhost:8000/applicationFeedbackView/?userID=${userId}`,
        });
        setApplicationFeedback(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicationFeedback();
  }, []);

  //function to make the cards from the meeting data
  const renderCard = (card, index) => {
    return (
      <Col md={6} key={index}>
        <Card className="mb-3 mt-3">
          <Card.Body>
            <Card.Title>{card.feedback}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Row>
        {applicationFeedback.map(renderCard)}
      </Row>
    </Container>
  )
}

export default MyApplicationFeedback;