import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!n

import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './Calendar.css';
import { useEffect } from 'react/cjs/react.production.min';
import axios from 'axios';

export default class CalendarD extends React.Component {
//const CalendarD = () =>  {
    componentDidMount() {
      axios.get('')
        .then(res => {
          const meetings = res.data;
          this.setState({ meetings })
        })
    }
    
    render() {
    return (
      <div className="schedule  sec__one">
        <h1>Calendar</h1>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        //weekends = {false}
        firstDay = '1'
        events={[
          { title: 'Meeting with John', start:  '2022-03-04 11:30:00' },
          { title: 'Meeting with Phil', start:  '2022-03-04 12:30:00' },
          { title: 'event 2', date: '2022-03-02',time: '14:00:00' }
        ]}
        height = '100%'
        contentHeight = 'auto'
        displayEventTime = 'true'
        eventBackgroundColor= '#D7F0F7'
        eventBorderColor= '#000080'
        eventTextColor= 'black'
        bold = 'true'
        eventDisplay = 'block'
        eventContent={renderEventContent}
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

