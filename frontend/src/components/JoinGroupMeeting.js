import DateTimePicker from "react-datetime-picker";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from 'react-router-dom';

function JoinGroupMeeting() {
  const [groupMeetingData, setGroupMeetingData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const user_data = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchGroupMeetings = async () => {
      try {
        const { data: response } = await axios({
          method: "GET",
          url: "http://localhost:8000/groupMeetingsView/",
        });
        setGroupMeetingData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroupMeetings();
  }, []);

  const joinMeeting = async (relationship) => {
    //function to allow mentee to join the meeting that they click on
    try {
      // make axios post request
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/menteeAttendingView/",
        data: {
          userID: user_data.user.id,
          relationship: relationship,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Col md={6} key={index}>
        <Card className="mb-3 mt-3">
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.date_time}</Card.Text>
            <Button
              onClick={() => {
                joinMeeting(card.relationship);
                setOpenModal(true);
              }}
            >
              Join Session
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div className="join_group_session sec__one">
      <Card>
        <h1>Join Sessions</h1>
        <Row>
          {/* Render Cards containing the meeting details */}
          {groupMeetingData.map(renderCard)}
        </Row>
      </Card>

      <Modal show={openModal}>
        <ModalBody>Successfully joined group Meeting!</ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(false);
              <Redirect to='/Calendar' />;
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default JoinGroupMeeting;
