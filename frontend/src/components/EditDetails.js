import React, { useState, useEffect } from 'react';
import DisplayDetails from './DisplayDetails';
import RadioButtons from './RadioButtons';
import SkillButtons from './Skills';
import { Card, CardBody, Button, Alert, Form, CustomInput } from 'reactstrap';
import { fetchBusinessAreas, fetchTopics } from "./GetTopicsBusinessAreas"
import axios from "axios";
//import DropDown from './DropDown';

const EditDetails = props => {
    const [item, setItem] = useState(null);

    const [businessAreaData, setBusinessAreaData] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [isMentee, setIsMentee] = useState(false);
    const [isMentor, setIsMentor] = useState(false);
    //const [selectedTopicsInterest, setSelectedTopicsInterest] = useState([]);

    const selectedTopicsInterest = [];
    const selectedTopicsExpertise = [];

    const [BAAlertVisible, setBAAlertVisible] = useState(false);

    const userId = 46;

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
                url: "http://localhost:8000/mentee_signup/",
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
                url: "http://localhost:8000/mentor_signup/",
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
                            <br/>
                            <br/>
                            <Form onSubmit={becomeMentee}>
                                {topicData.map(topic => <CustomInput
                                    type="checkbox"
                                    id={topic.name}
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
                            <br/><br/>
                            <Form onSubmit={becomeMentor}>
                                {topicData.map(topic => <CustomInput
                                    type="checkbox"
                                    id={topic.name}
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

            <br></br>

            <h3>Add or remove your topics of interest:</h3>
            <SkillButtons array={["x", "y", "z", "w", "r"]} />

            <br></br>

            <h3>Add or remove your topics of expertise:</h3>
            <SkillButtons array={["x", "y", "z", "w", "r"]} />
            { /*<DropDown array={["x","y","z","w","r"]}  /> */}

        </div>
    )
}

export default EditDetails;
