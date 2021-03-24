import { Calendar, momentLocalizer, Views   } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useState } from 'react';
import { useEffect } from 'react';


const localizer = momentLocalizer(moment);

const propTypes = {}

function MyCalendar() {
    const [myEvent, setMyEvent] = useState([])

    var  handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name');
        
      
        if (title) {
            let copyMyEvent = [...myEvent];
            copyMyEvent.push(
                {
                    start,
                    end,
                    title
                }
            )
            setMyEvent(copyMyEvent);

        }
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
            step={30}
            views={["month", "week", "day", 'agenda']}
        />
    ) 
}

MyCalendar.propTypes = propTypes

export default MyCalendar;