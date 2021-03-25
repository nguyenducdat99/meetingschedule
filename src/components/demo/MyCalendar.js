import { Calendar, momentLocalizer, Views   } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useState } from 'react';
import { db } from '../config/FirebaseConfig';
import { useEffect } from 'react';
import Detail from './MeetingDetail';


const localizer = momentLocalizer(moment);

const propTypes = {}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function findEvent(items, id) {
    let  result = {};

    items.forEach(element => {
        if (element.id === id) result = {...element}
    });

    return result;
}

function findIndex(items, id) {
    let  result = -1;

    items.forEach((element,index) => {
        if (element.id === id) result = index;
    });

    return result;
}

function MyCalendar() {
    // declare firebase database
    const database = db.database();

    // declare event state
    const [myEvent, setMyEvent] = useState([])
    const [showDetail, setShowDetail] = useState(false);
    const [presentEvent, setPreventEvent] = useState(
        {
            id: '',
            start: '',
            end: '',
            title: ''
        }
    )

    // load data
    useEffect(
        () => {
            // declare event get from firebase;
            var listMeeting = [];
            database.ref('meeting').get().then(function(snapshot) {
                if (snapshot.exists()) {
                    snapshot.forEach(child=>{
                        listMeeting.push(
                            {
                                id: child.key,
                                start: new Date(JSON.parse(child.val() ).start),
                                end: new Date(JSON.parse(child.val() ).end),
                                title: JSON.parse(child.val() ).title
                            }
                        )
                    })
                    setMyEvent([...listMeeting]);
                }
                else {
                    console.log("No data available");
                }
            }).catch(function(error) {
                console.error(error);
            });
            // eslint-disable-next-line
        },[]
    )
    
        // console.log(myEvent);
    // handle when select  time
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
            database.ref('meeting/'+createUUID()).set(
                JSON.stringify(
                    {
                        start,
                        end,
                        title
                    }
                )
            )
        }
    }

    // hanle when select event 
    var onSelectEvent = event => {
        setPreventEvent({
            ...presentEvent,
            id: findEvent(myEvent,event.id).id,
            start: findEvent(myEvent,event.id).start,
            end: findEvent(myEvent,event.id).end,
            title: findEvent(myEvent,event.id).title
        })
       
        onOpenForm();
       
    }

    // open form 
    var onOpenForm = () => {
        setShowDetail(true);
    }

    // close form
    var onCloseForm = () => {
        setShowDetail(false);
        setPreventEvent({
            ...presentEvent,
            id: '',
            start: '',
            end: '',
            title: ''
        })
    }

    // delete event select
    var onDeleteEvent = id => {
        onCloseForm();
        let index = findIndex(myEvent,id);
        
        if (id!==-1) {
            myEvent.splice(index,1);
            setMyEvent([...myEvent]);
            database.ref('meeting/'+id).remove();
        }
    }

    return (
        <>
            <Calendar 
                selectable
                localizer={localizer}
                events={myEvent}    
                defaultView={Views.WORK_WEEK}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(Date.now())}
                onSelectEvent={onSelectEvent}
                onSelectSlot={handleSelect}
                step={30}
                views={["month","work_week", "week", "day", 'agenda']}
            />
            {
                showDetail?
                <Detail
                    onClose={onCloseForm}
                    presentEventRec={presentEvent}
                    onDelete={onDeleteEvent}
                />:
                ''
            }
        </>
    ) 
}

MyCalendar.propTypes = propTypes

export default MyCalendar;