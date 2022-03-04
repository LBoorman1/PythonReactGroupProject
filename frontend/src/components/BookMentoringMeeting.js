import React from 'react';
import SelectThisTime from './SelectThisTime';
import {Card} from 'reactstrap';

const BookMentoringMeeting = () => {
    return (
        <div className="book_mentoring_meeting sec__one">
            <h1> Book Mentoring Meeting </h1>
            <br></br>

            <Card>
            <br></br>
            <h1>My Mentor's free time:</h1>
            <SelectThisTime />
            <SelectThisTime />
            <SelectThisTime />

            
            </Card>
        </div>
    )
}

export default BookMentoringMeeting
