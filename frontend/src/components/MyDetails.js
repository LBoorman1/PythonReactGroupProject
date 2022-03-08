import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import DisplayDetails from './DisplayDetails';
import DisplayDeatils from './DisplayDetails';

const MyDetails = () => {
    console.log(localStorage);
    return (
        <div className="my_details sec__one">
            <h1> My Details </h1>
            
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
export default MyDetails
