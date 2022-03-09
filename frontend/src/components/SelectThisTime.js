import React, { useState } from "react";
import DisplayFreeHours from './DisplayFreeHours';
import {Card,Button} from 'reactstrap';

const SelectThisTime = () => {
    const [text,setText] = useState("Book Available Time");
    const handleBooking = () => {
        if (text==="Book Available Time"){
            setText("Remove Requested Time");
        }
        else {
            setText("Book Available Time");
        }


    };
    


    return (
        
        <div className="book_mentoring_meeting sec__one">
            <Card>
            <br></br>
            <Card>
            <div id="myDIV">
            <DisplayFreeHours startTime="x" endTime="y" />
            <Button onClick= {handleBooking}>{text}</Button>
            </div>
            </Card>
            </Card>
        </div>
    )
}
export default SelectThisTime