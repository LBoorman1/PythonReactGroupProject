import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";

const ViewFeedback = () => {
  //Admin only feature to view all system feedback
  //Request all application feedback
  const [applicationFeedback, setApplicationFeedback] = useState([]);

  useEffect(() => {
    const fetchApplicationFeedback = async () => {
      try {
        const { data: response } = await axios({
          method: "GET",
          url:
            "http://localhost:8000/applicationFeedbackView/",
        });
        setApplicationFeedback(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicationFeedback();
  }, []);

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
        <h1 className="text-light">All system feedback</h1>
        <Row>
        {applicationFeedback.map(renderCard)}
        </Row>
    </Container>
  );
};

export default ViewFeedback;
