import { Link } from 'react-router-dom';
import { Card, CardBody, Form, Label, Alert, Input, Button } from 'reactstrap';
import axios from 'axios';
import React, { useState, useEffect } from "react";

const BookMentoringMeeting = () => {
    const [relationship, setRelationship] = useState(false);
    const [freeHourData, setFreeHourData] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.user.id;

    let content;

    const createMeeting = async (e) => {
        e.preventDefault();
        try {
            const meeting_date = new Date(e.target.meetingTime.value).toISOString()
            const response = await axios({
                method: "POST",
                url: "http://localhost:8000/meetings/",
                data: {
                    relationship: relationship[0].id,
                    date_time: meeting_date,
                    attendance_status: "GA",
                    title: e.target.meetingTitle.value,
                    notes: e.target.meetingNotes.value,
                    mentor_id: relationship[0].mentor
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(freeHourData);
            for (const hour of freeHourData) {
                console.log(hour);
                console.log(hour.available_hour)
                console.log(e.target.meetingTime.value);
                console.log(hour.available_hour !== e.target.meetingTime.value);
            }
            const example = freeHourData.filter(freeHour => freeHour.available_hour !== e.target.meetingTime.value);
            console.log(example);
            setFreeHourData(example);
            console.log(freeHourData);
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
        const fetchFreeHours = async () => {
            if (relationship.length > 0) {
                try {
                    const response = await axios({
                        method: "GET",
                        url: `http://localhost:8000/freehoursbymentor/?profile_id=${relationship[0].mentor}`,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    setFreeHourData(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchFreeHours();
    }, [relationship]);

    if (relationship.length == 0) {
        content = (
            <div style={{ textAlign: "center" }}>
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
                                <option name={freeHour.available_hour.toString()} value={freeHour.available_hour}>
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
            <br />

            {content}
        </div>
    );
}

export default BookMentoringMeeting;
