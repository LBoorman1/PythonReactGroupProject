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
    const [topicInterestItemData, setTopicInterestItemData] = useState([]);
    const [topicExpertiseItemData, setTopicExpertiseItemData] = useState([]);

    const [BAAlertVisible, setBAAlertVisible] = useState(false);

    const userId = 4;

    // Map each topic to a checkbox for topics of interest and a checkbox for topics of expertise
    useEffect(() => {
        fetchTopics()
            .then(data => {
                setTopicInterestItemData(data);
                //alert(topicInterestItemData);
                /*topicInterestItemData.map(topic => {
                    <CustomInput type="checkbox" id="topicCheck" label={topic.name} name={topic.id.toString()} />
                });*/
                /*topicExpertiseItemData.map(topic => {
                    <CustomInput type="checkbox" id="topicCheck" label={topic.name} name={topic.id.toString()} />
                });*/
                console.log(topicInterestItemData);
                //console.log(topicInterestItemData);
            });
    }, []);

    useEffect(() => {
        fetchBusinessAreas()
            .then(data => setBusinessAreaData(data));
    }, []);

    /*topicInterestItemData.map(topic => {
        <CustomInput type="checkbox" id="topicCheck" label={topic.name} name={topic.id.toString()} />
    });
    topicExpertiseItemData.map(topic => {
        <CustomInput type="checkbox" id="topicCheck" label={topic.name} name={topic.id.toString()} />
    });*/

    const becomeMentee = async (e) => {
        //for 

        {/*become mentee*/ }

    }

    const becomeMentor = async (e) => {


        {/*become mentor*/ }

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
                    <Form>
                        {topicInterestItemData.map(topic => <CustomInput type="checkbox" id={topic.name} label={topic.name} name={topic.id.toString()} />)}
                        <br />
                        <Button onClick={mentee}>Select here to become a mentor!</Button>
                    </Form>
                    <br />
                    <Form>
                        {topicExpertiseItemData.map(item => item)}
                        <Button onClick={mentor}>Select here to become a mentee!</Button>
                    </Form>
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
