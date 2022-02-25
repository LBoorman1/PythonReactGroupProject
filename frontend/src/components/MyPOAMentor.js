import React from 'react'
import Checkboxes from './Checkboxes';


const MyPOAMentor= () => {
    return (
        <div className="my_poa_mentor sec__one">
            <h1> My POA Mentor </h1>

            <Checkboxes 
                title="POA 1 title"
                id="12345"
                firstName="mentor firstname"
                lastName="mentor lastname"
                checkList={["milestone1","milestone2","milestone3"]}
                completed={["completedMilestone"]}
                />

            <Checkboxes 
                title="POA 2 title"
                id="12345"
                firstName="mentor firstname"
                lastName="mentor lastname"
                checkList={["milestone1","milestone2","milestone3"]}
                completed={["completedMilestone"]}
                />
        </div>
    )
}

export default MyPOAMentor