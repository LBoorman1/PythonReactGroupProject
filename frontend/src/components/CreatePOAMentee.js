import React from 'react';
import BulletList from './BulletList';
import {Button} from 'reactstrap';



const CreatePOAMentee = () => {
    return (
        <div className="create_poa_mentee sec__one">
            <h1> Create POA Mentee </h1>
            <BulletList />
            <Button >Save and Create</Button>
            

        </div>
    )
}

export default CreatePOAMentee
