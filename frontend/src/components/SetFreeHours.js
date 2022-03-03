import React, { useState } from "react";
import {Card,Button} from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import DisplayFreeHours from "./DisplayFreeHours";


const SetFreeHours= () => {
    const [dateStart, setDateStart]= useState(new Date());
    const [dateEnd, setDateEnd]= useState(new Date());

    const addToFreeHours = (e) => {
        {/* PERFORM SUBMIT */}
      }

    return (
        <div className="set_free_hours  sec__one">
            <h1>Set Free Hours </h1>

            <Card>
            <form>

            <h3>Select free time start and end:</h3>
            

            <DateTimePicker onChange={(d) => setDateStart(d)}
            value = {dateStart}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM Do YYYY, h:mm:ss a"            
            />

            <DateTimePicker onChange={(d) => setDateEnd(d)}
            value = {dateEnd}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM Do YYYY, h:mm:ss a"            
            />
            
            <h3>New free time:</h3>

            <DisplayFreeHours startTime={dateStart.toString()} endTime={dateEnd.toString()} />

            <Button onClick = {addToFreeHours()}>Submit</Button>
            </form>

            </Card>

            <Card>
            <br></br>
            <h1>My free hours:</h1>

            <DisplayFreeHours startTime={dateStart.toString()} endTime={dateEnd.toString()} />
            <DisplayFreeHours startTime={dateStart.toString()} endTime={dateEnd.toString()} />
            <DisplayFreeHours startTime={dateStart.toString()} endTime={dateEnd.toString()} />
            <DisplayFreeHours startTime={dateStart.toString()} endTime={dateEnd.toString()} />
            </Card>

            


        </div>
    )
}

export default SetFreeHours
