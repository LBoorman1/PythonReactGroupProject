import { Link } from 'react-router-dom';
import { Card, CardBody, Form, Label, Alert, Input, Button } from 'reactstrap';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import fetchFreeHours from "./GetFreeHours";

const BookMentoringMeeting = () => {
    const [relationship, setRelationship] = useState(false);
    const [freeHourData, setFreeHourData] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    
    const userId = 4;
    let content;
    
    const createMeeting = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:8000/meetings/",
                data: {
                    relationship: relationship[0].id,
                    date_time: new Date(e.target.meetingTime.value).toISOString(),
                    attendance_status: "GA",
                    title: e.target.meetingTitle.value,
                    notes: e.target.meetingNotes.value,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchRelationship = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8000/menteerelationship/?user_id=${userId}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setRelationship(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRelationship();
    }, []);

    useEffect(() => {
        if (relationship.length > 0) {
            fetchFreeHours(relationship[0].mentor)
                .then(data => setFreeHourData(data));
        }
    }, [relationship]);

    if (relationship.length == 0) {
        content = (
            <div style={{textAlign: "center"}}>
                Looks like you don't have a mentor! Would you like to <Link activeClassName='is-active' to={`/DisplayMyMentor`}>request one</Link>?
            </div>
        )
    } else {
        content = (
            <Card>
                <CardBody>
                    <Alert color="info" isOpen={alertVisible}>
                        Successfully booked meeting!
                    </Alert>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        createMeeting(e);
                        setAlertVisible(true);
                        window.setTimeout(() => {
                            setAlertVisible(false)
                        }, 2000);
                    }}
                    >
                        <Label for="meetingTitle">Meeting Title:</Label>
                        <Input id="meetingTitle" name="meetingTitle" />
                        <br />
                        <Label for="meetingTime">Meeting Time (select from your mentor's available times):</Label>
                        <Input type="select" name="meetingTime" id="meetingTime">
                            {freeHourData.map(freeHour =>
                                <option value={freeHour.available_hour}>
                                    {freeHour.available_hour.toString()}
                                </option>
                            )}
                        </Input>
                        <br />
                        <Label for="meetingNotes">Notes:</Label>
                        <Input type="textarea" id="meetingNotes" name="meetingNotes" />
                        <br />
                        <Button type="submit" color="primary">Book Meeting</Button>
                    </Form>
                </CardBody>
            </Card>
        )
    }

    return (
        <div className="book_mentoring_meeting sec__one">
            <h1> Book Mentoring Meeting </h1>
            <br></br>

            {content}
        </div>
    );
}

export default BookMentoringMeeting;
