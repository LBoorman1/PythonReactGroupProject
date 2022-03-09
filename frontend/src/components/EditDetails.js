import React from 'react';
import {useState} from 'react';
import DisplayDetails from './DisplayDetails';
import RadioButtons from './RadioButtons';
import SkillButtons from './Skills';
import {Card,Button} from 'reactstrap';
//import DropDown from './DropDown';

const EditDetails = props => {
    const [item,setItem]= useState(null);
    const mentee   = () => {


        {/*become mentee*/}

    }
    const mentor   = () => {


        {/*become mentor*/}

    }

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

            <Card>
                <Button onClick={mentee}>Select here to become a mentor!</Button>
                <br></br>
                <Button onClick={mentor}>Select here to become a mentee!</Button>
                 <br></br>
            </Card>


            <Card>


            <RadioButtons array={["x","y","z","w","r"]} />

            <br></br>

            <h3>Select skills you have:</h3>
            <SkillButtons array={["x","y","z","w","r"]}  />

            <br></br>

            <h3>Select skills to improve:</h3>
            <SkillButtons array={["x","y","z","w","r"]}  />


           { /*<DropDown array={["x","y","z","w","r"]}  /> */}

           
            </Card>
            
        </div>
    )
}

export default EditDetails
