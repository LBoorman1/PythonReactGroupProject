import React from 'react'
import FeedbackCard from './FeedbackCard';

const MyFeedback = () => {
    return (
        <div className="my_feedback sec__one">
            <h1> My Feedback </h1>
            <FeedbackCard feedback="here is my feedback"/>
            <FeedbackCard feedback="here is my feedback 2"/>
            <FeedbackCard feedback="here is my feedback 3"/>

        </div>
    )
}

export default MyFeedback
