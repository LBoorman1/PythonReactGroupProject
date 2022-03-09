import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DisplayDetails from './DisplayDetails';

const MyDetails = () => {
    console.log(localStorage);
    return (
        <div className="my_details sec__one">
            <h1> My Details </h1>

            <DisplayDetails
                firstname="testing"
                surname="testing two"
                business_area="my department 2"
                is_mentee="true"
                is_mentor="true"
                is_admin="true"
            />

        </div>
    )
}
export default MyDetails
