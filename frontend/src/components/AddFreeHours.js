import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardBody, Button } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import DisplayFreeHours from "./DisplayFreeHours";
//import DateTimePicker from '@mui/lab/DateTimePicker';
import fetchFreeHours from "./GetFreeHours";

const AddFreeHours = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0);

    const userId = 4;

    const [dateStart, setDateStart] = useState(date);
    const [freeHourData, setFreeHourData] = useState([]);

    useEffect(() => {
        fetchFreeHours(userId)
            .then(data => setFreeHourData(data));
    }, []);

    const addToFreeHours = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:8000/freehours/",
                data: {
                    user_id: userId,
                    available_hour: dateStart
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(dateStart);
            setFreeHourData([...freeHourData, { "available_hour": dateStart }]);
            console.log(freeHourData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="set_free_hours  sec__one">
            <h1>Add Free Hours </h1>
            <br />
            <Card>
                <CardBody>
                    <form onSubmit={addToFreeHours}>
                        Select Hour: &emsp;
                        {/* Time must be selected by the hour */}
                        <DateTimePicker onChange={(d) => setDateStart(d)}
                            value={dateStart}
                            timeFormat="HH"
                            maxDetail="hour"
                            disableClock
                            dateFormat="MMMM Do YYYY, h a"
                        />
                        <br />
                        <br />

                        New Free Hour:

                        <DisplayFreeHours startTime={dateStart.toString()} />

                        <Button color="primary">Submit</Button>
                        <br />
                        <br />
                    </form>
                </CardBody>
            </Card>

            <br />
            <Card>
                <CardBody>
                    <h3>My Free Hours:</h3>
                    {freeHourData.map(
                        freeHour => (<DisplayFreeHours startTime={freeHour.available_hour.toString()} />)
                    )}
                </CardBody>
            </Card>
        </div >
    )
}

export default AddFreeHours;
