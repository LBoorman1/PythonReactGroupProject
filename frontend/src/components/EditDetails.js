import React, { useState, useEffect } from 'react';
import RadioButtons from './RadioButtons';
import { Card, CardBody, Button, Alert, Form, CustomInput } from 'reactstrap';
import { fetchBusinessAreas, fetchTopics } from "./GetTopicsBusinessAreas"
import axios from "axios";

const EditDetails = props => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    const [businessAreaData, setBusinessAreaData] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [isMentee, setIsMentee] = useState(user.is_mentee);
    const [isMentor, setIsMentor] = useState(user.is_mentor);

    const selectedTopicsInterest = [];
    const selectedTopicsExpertise = [];

    const [BAAlertVisible, setBAAlertVisible] = useState(false);

    // Map each topic to a checkbox for topics of interest and a checkbox for topics of expertise
    useEffect(() => {
        fetchTopics()
            .then(data => {
                setTopicData(data);
            });
    }, []);

    useEffect(() => {
        fetchBusinessAreas()
            .then(data => setBusinessAreaData(data));
    }, []);

    const topicsInterestSelectedChange = async (e) => {
        console.log(e.target.value);
        if (e.target.checked) {
            selectedTopicsInterest.push(e.target.value);
        } else {
            selectedTopicsInterest.splice(selectedTopicsInterest.indexOf(e.target.value), 1);
        }
        console.log(selectedTopicsInterest);
    }

    const topicsExpertiseSelectedChange = async (e) => {
        console.log(e.target.value);
        if (e.target.checked) {
            selectedTopicsExpertise.push(e.target.value);
        } else {
            selectedTopicsExpertise.splice(selectedTopicsExpertise.indexOf(e.target.value), 1);
        }
        console.log(selectedTopicsExpertise);
    }

    const becomeMentee = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:8000/menteesignup/",
                data: {
                    "user_id": userId,
                    "topics": selectedTopicsInterest
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setIsMentee(true);
        } catch (error) {
            console.log(error);
        }
    }

    const becomeMentor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:8000/mentorsignup/",
                data: {
                    "user_id": userId,
                    "topics": selectedTopicsExpertise
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setIsMentor(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleBusinessAreaChange = async (e) => {
        console.log(e.target.businessArea)
        e.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:8000/businessareachangerequests/",
                data: {
                    "user_id": userId,
                    "new_business_area_id": e.target.businessArea.value,
                    "checked": false
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setBAAlertVisible(true);
            window.setTimeout(() => {
                setBAAlertVisible(false)
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="edit_details sec__one">
            <br></br>
            <h1> Edit Details </h1>
            <br />

            <Card>
                <CardBody>
                    {!isMentee &&
                        <div>
                            <h3>Become a Mentee</h3>
                            Select your topics of interest:
                            <br />
                            <br />
                            <Form onSubmit={becomeMentee}>
                                {topicData.map(topic => <CustomInput
                                    type="checkbox"
                                    id={topic.name + "mentee"}
                                    label={topic.name}
                                    name={topic.name}
                                    value={topic.id}
                                    onChange={topicsInterestSelectedChange}
                                />)}
                                <br />
                                <Button color="primary" onClick={becomeMentee}>Become a Mentee</Button>
                            </Form>
                        </div>
                    }
                    <br />
                    {!isMentor &&
                        <div>
                            <h3>Become a Mentor</h3>
                            Select your topics of expertise:
                            <br /><br />
                            <Form onSubmit={becomeMentor}>
                                {topicData.map(topic => <CustomInput
                                    type="checkbox"
                                    id={topic.name + "mentor"}
                                    label={topic.name}
                                    name={topic.name}
                                    value={topic.id}
                                    onChange={topicsExpertiseSelectedChange}
                                />)}
                                <Button color="primary" onClick={becomeMentor}>Send Mentor Request</Button>
                            </Form>
                        </div>
                    }
                    <br />
                </CardBody>
            </Card>

            <br />

            <Card>
                <CardBody>
                    <h3>Request Business Area Change:</h3>
                    <br />


                    <p>Please select the radio button corresponding to your new business area: </p>

                    <RadioButtons businessAreas={businessAreaData} onRequest={handleBusinessAreaChange} />
                    <br />

                    <Alert color="info" isOpen={BAAlertVisible}>
                        Successfully sent business area change request
                    </Alert>
                </CardBody>
            </Card>
        </div>
    )
}

export default EditDetails;
