import SelectThisTime from './SelectThisTime';
import {Card} from 'reactstrap';
import React, { useState } from "react";

const BookMentoringMeeting = () => {
    return (
        <div className="book_mentoring_meeting sec__one">
            <h1> Book Mentoring Meeting </h1>
            <br></br>

            <Card>
            <br></br>
            <h1>Select a time slot from my Mentor's free time:</h1>
            <SelectThisTime />
            <SelectThisTime />
            <SelectThisTime />

            
            </Card>
        </div>
    )
}

export default BookMentoringMeeting
