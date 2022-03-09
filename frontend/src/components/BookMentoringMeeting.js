import SelectThisTime from './SelectThisTime';
import { Card } from 'reactstrap';
import React, { useState, useEffect } from "react";

const BookMentoringMeeting = () => {
    const [relationship, setRelationship] = useState(false);
    const [freeHourData, setFreeHourData] = useState([]);
    
    const userId = 4;

    useEffect(() => {
        const fetchRelationship= async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8000/getmenteerelationship/user_id=${userId}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setRelationship(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRelationship();
    }, []);

    if (relationshipData != []) {
        
    }

    return (
        <div className="book_mentoring_meeting sec__one">
            <h1> Book Mentoring Meeting </h1>
            <br></br>

            <Card>
                <br></br>
                <h1>Select a time slot from your mentor's free time:</h1>
                <SelectThisTime />
                <SelectThisTime />
                <SelectThisTime />


            </Card>
        </div>
    )
}

export default BookMentoringMeeting
