import React from 'react'
import Checkboxes from './Checkboxes';

const MyPOAMentee= () => {
    return (
        <div className="my_poa_mentee sec__one">
            <h1> My POA Mentee </h1>

            <Checkboxes 
                title="POA 1 title"
                id="12345"
                firstName="mentor firstname"
                lastName="mentor lastname"
                checkList={["milestone1","milestone2","milestone3"]}
                completed={["completed milestone 1"]}
                />

            <Checkboxes 
                title="POA 2 title"
                id="12345"
                firstName="mentor firstname"
                lastName="mentor lastname"
                checkList={["milestone1","milestone2","milestone3"]}
                completed={["completed milestone 1"]}
                />
        </div>
    )
}

export default MyPOAMentee
