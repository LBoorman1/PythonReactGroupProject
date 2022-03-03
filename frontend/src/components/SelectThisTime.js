import React from 'react';
import DisplayFreeHours from './DisplayFreeHours';
import {Card,Button} from 'reactstrap';

const SelectThisTime = () => {


    return (
        <div className="book_mentoring_meeting sec__one">
            <Card>
            <br></br>
            <Card>
            <div id="myDIV">
            <DisplayFreeHours startTime="x" endTime="y" />
            <Button>Book Available Time</Button>
            </div>
            </Card>
            </Card>
        </div>
    )
}
export default SelectThisTime