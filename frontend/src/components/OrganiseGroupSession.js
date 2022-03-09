import {React,useState} from 'react';
import {Card,Button} from 'reactstrap';
import Requests from './Request';
import DropDown from './DropDown';
import DateTimePicker from 'react-datetime-picker';
import DisplayFreeHours from "./DisplayFreeHours";


const OrganiseGroupSession= () => {
    const [dateStart, setDateStart]= useState(new Date());
    const [dateEnd, setDateEnd]= useState(new Date());

    const handleSubmit = (e) => {}

    return (
        <div className="organise_group_session sec__one">
            <h1>Organise Group Session </h1>
            <br></br>
            <Card>
              <h1>My Requests for group sessions:</h1>
              <Requests type="Set up group session" request="Skill y"/>
              <Requests type="Set up group session" request="Skill z"/>
            </Card>

            <br></br>
            <Card>
            <h1>Set up group session:</h1>
            <DropDown title="Select Skill" array={["item 1", "item 2", "item 3"]} />
            <h3>Select start time:</h3>

            <DateTimePicker onChange={(d) => setDateStart(d)}
            value = {dateStart}
            showTimeSelect
            timeFormat="HH"
            timeIntervals={60}
            dateFormat="MMMM Do YYYY, h a"            
            />

            <h3>Select end time:</h3>

            <DateTimePicker onChange={(d) => setDateEnd(d)}
            value = {dateEnd}
            showTimeSelect
            timeFormat="HH"
            timeIntervals={1}
            dateFormat="MMMM Do YYYY, h a"  
            />
            <br></br>

            <Button onClick={handleSubmit}>Submit</Button>
            </Card>
            
        </div>
    )
}
export default OrganiseGroupSession
