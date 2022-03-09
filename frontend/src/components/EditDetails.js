import React from 'react';
import { useState } from 'react';
import DisplayDetails from './DisplayDetails';
import RadioButtons from './RadioButtons';
import SkillButtons from './Skills';
import { Card, Button } from 'reactstrap';
//import DropDown from './DropDown';

const EditDetails = props => {
    const [item, setItem] = useState(null);

    const mentee = () => {


        {/*become mentee*/ }

    }
    const mentor = () => {


        {/*become mentor*/ }

    }

    return (
        <div className="edit_details sec__one">
            <br></br>
            <h1> Edit Details </h1>

            <Card>
                <Button onClick={mentee}>Select here to become a mentor!</Button>
                <br></br>
                <Button onClick={mentor}>Select here to become a mentee!</Button>
                <br></br>
            </Card>


            <Card>
                <RadioButtons array={["x", "y", "z", "w", "r"]} />

                <br></br>

                <h3>Add or remove your topics of interest:</h3>
                <SkillButtons array={["x", "y", "z", "w", "r"]} />

                <br></br>

                <h3>Add or remove your topics of expertise:</h3>
                <SkillButtons array={["x", "y", "z", "w", "r"]} />
                { /*<DropDown array={["x","y","z","w","r"]}  /> */}
            </Card>

        </div>
    )
}

export default EditDetails;
