import { Calendar, momentLocalizer, Views   } from 'react-big-calendar' 
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useState } from 'react';
// import ExampleControlPlot from './ExampleControlPlot';

const localizer = momentLocalizer(moment);

function MyCalendar() {
    const [myEvent, setMyEvent] = useState(
        [
            ...events
        ]
    )

    var  handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
            setMyEvent([
              ...events,
              {
                start,
                end,
                title,
              }
            ])
      }


    return (
        <Calendar 
            selectable
            localizer={localizer}
            events={myEvent}
            defaultView={Views.DAY}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(Date.now())}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={handleSelect}
        />
    ) 
}


export default MyCalendar;