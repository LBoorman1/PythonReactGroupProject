import React from 'react'
import BulletList from './BulletList'
import {Button} from 'reactstrap';
import SearchUser from './SearchUser';
 

const CreatePOAMentor= () => {
    return (
        <div className="create_poa_mentor sec__one">
            <h1>Create POA Mentor </h1>

            <BulletList/>
            <SearchUser />
            <Button >Save and Create</Button>
        </div>
    )
}

export default CreatePOAMentor
