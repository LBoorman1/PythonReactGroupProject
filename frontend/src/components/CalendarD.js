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
//const CalendarD = () =>  {
    //one = {title:"Meeting with phil",date_time: 0}
    

    state = {
      meetings:[]
    }
    componentDidMount() {
      axios.get('http://localhost:8000/meetingView/?userID=5')
        .then(res => {
          const meetings = res.data;
          this.setState({ meetings })
        })
    }
    //eventsArr = this.state.meetings.map((meeting)=> <li>meeting.title</li>);

    //event1 = {
    //  title:'',
    //  : ''
    //}

    render() {
    return (
      <div className="schedule  sec__one">
        <h1>Calendar</h1>
        
        <ul>
          { this.state.meetings.map(meeting =>
            <li>{meeting.title} {meeting.date_time}</li>)}
        </ul>
      
      <FullCalendar
        
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        //weekends = {false}
        firstDay = '1'
          //.map(meeting => ({ title: this.meeting.title},{start:this.meeting.date_time})
        events = {[
          { title: 'Meeting with John', start:  '2022-03-04 11:30:00' },
          { title: 'Meeting with Phil', start:  '2022-03-04 12:30:00' }
        ]}
        ////2020-03-24T00:00:00Z
        height = '100%'
        contentHeight = 'auto'
        displayEventTime = 'true'
        eventBackgroundColor= '#D7F0F7'
        eventBorderColor= '#000080'
        eventTextColor= 'black'
        bold = 'true'
        eventDisplay = 'block'
        eventContent={renderEventContent}
        nowIndicator ='true'
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

//function eventToFormat(title1,date_time1){
//  return (
//    title: title1,
//    date_time:datetime
//  )
//}


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

