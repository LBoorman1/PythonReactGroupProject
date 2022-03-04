import React from 'react';
import {useState} from 'react';
import DisplayDetails from './DisplayDetails';

const EditDetails = props => {
    const [item,setItem]= useState(null);
    return (
        <div className="edit_details sec__one">

            <br></br>

            <h1> Edit and Display Details </h1>
            <h1> Edit Details </h1>
            <h3>Forename: {props.forename}</h3>
            <h3>Surname: {props.surname}</h3>
            <h3>Department: {props.department}</h3>

            <input value={item} type="checkbox"/>

            <input value={item} type="checkbox"/>
            <input value={item} type="checkbox"/>


            <DisplayDetails 
            firstname = "testing"
            surname = "testing two"
            department = "my department 2"
            mentor = "true"
            mentee = "true"
            admin = "true"
            mentorID = "test"
            menteeIDList = "mentee ID list"/>
            
        </div>
    )
}

export default EditDetails
