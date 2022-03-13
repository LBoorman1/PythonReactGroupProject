import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';
import axios from 'axios';

export default class CalendarD extends React.Component {

    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('user'));
        this.state = { meetings: [], user: user }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/meetings/?userID=${this.state.user.user.id}`)
            .then(res => {
                this.setState({ meetings: res.data });
            })
    }

    render() {
        return (
            <div className="schedule  sec__one">
                <h1>Calendar</h1>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    firstDay='1'
                    events={
                        this.state.meetings
                            .map(meeting => (
                                {
                                    title: meeting.title,
                                    start: meeting.date_time
                                })
                            )
                    }
                    height='100%'
                    contentHeight='auto'
                    displayEventTime='true'
                    eventBackgroundColor='#D7F0F7'
                    eventBorderColor='#000080'
                    eventTextColor='black'
                    bold='true'
                    eventDisplay='block'
                    eventContent={renderEventContent}
                    nowIndicator='true'
                />
            </div>

        )
    }
}

function renderEventContent(eventInfo) {
    return (
        <>
            <p><b>{eventInfo.timeText}m</b><br></br>
                {eventInfo.event.title}</p>
        </>
    )
}