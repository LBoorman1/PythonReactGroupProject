import React from 'react';
import {useState} from 'react';
import DisplayDetails from './DisplayDetails';

const EditDetails = props => {
    const [item,setItem]= useState(null);
    return (
        <div className="edit_details sec__one">


            <br></br>

            <h1> Edit and Display Details </h1>


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
