import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!n

import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './Calendar.css';
import { useEffect } from 'react/cjs/react.production.min';
import axios from 'axios';
import MeetingMaker from "./FeedBackComponents/MeetingMaker";

export default class CalendarD extends React.Component {
    constructor(props) {
        super(props);
        this.state = { meetings: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/meetingView/?userID=5')
            .then(res => {
                this.setState({ meetings: res.data });
            })
    }

    render() {
        console.log(this.state.meetings);
        return (
            <div className="schedule  sec__one">
                <h1>Calendar</h1>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    //weekends = {false}
                    firstDay='1'
                    events={
                        this.state.meetings
                            .map(meeting =>(
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

//export default CalendarD;

//let calendar = new Calendar(calendarEl, {
//    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
//    initialView: 'dayGridMonth',
//    headerToolbar: {
//      left: 'prev,next today',
//      center: 'title',
//      right: 'dayGridMonth,timeGridWeek,listWeek'
//    }
//});
