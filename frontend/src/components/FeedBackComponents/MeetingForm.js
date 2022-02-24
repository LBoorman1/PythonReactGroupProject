import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import MeetingMaker from "./MeetingMaker";

function MeetingForm(props) {
    
    /*Assuming we have queried the database for all meetings that {user} attended */
    const dummyMeetings = [
        {
            id: 1,
            title: "Test 1",
            date_time: "2019-01-03",
        },
        {
            id: 2,
            title: "Test 2",
            date_time: "2018-02-04",
        },
        {
            id: 3,
            title: "Test 3",
            date_time: "2014-05-03",
        }
    ]
    
    /*figure out how to display all meetings in state as an option in the form */

    return (
        <div>
        
        <form action="send this to django back-end with url containing user id???">
        <FormGroup>
            <Label for="whichMeeting">Which meeting do you want to review?</Label>
        </FormGroup>
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
        </div>
    );
}

export default MeetingForm;