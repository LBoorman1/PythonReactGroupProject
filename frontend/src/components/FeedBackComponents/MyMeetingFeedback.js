import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import axios from 'axios';

function MyMeetingFeedback() {
  const user_data = JSON.parse(localStorage.getItem("user"));
  const userID = user_data.user.id;
  const [meetingFeedback, setMeetingFeedback] = useState([]);

  useEffect(() => {
    const fetchMeetingFeedback = async () => {
      try {
        const { data: response } = await axios({
          method: "GET",
          url: "http://localhost:8000/meetingFeedbackView/?userID=" + userID, 
        });
        setMeetingFeedback(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeetingFeedback();
  }, []);
  
  const renderCard = (card, index) => {
    return (
      <Col md={6} key={index}>
        <Card className="mb-3 mt-3">
          <Card.Body>
            <Card.Title>{card.meetingtitle}</Card.Title>
            <Card.Text>{card.feedback}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Row>
        {meetingFeedback.map(renderCard)}
      </Row>
    </Container>
  )
}

export default MyMeetingFeedback