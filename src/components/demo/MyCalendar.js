import { Calendar, momentLocalizer, Views   } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useState,useEffect } from 'react';
import { db } from '../config/FirebaseConfig';
import Detail from './MeetingDetail';
import { resourceMap } from './MeetingRoom';
import MeetingInput from './MeetingInput';



const roomMap = [ ...resourceMap ];

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
    const [showInput, setShowInput] = useState(false);
    const [presentEvent, setPresentEvent] = useState(
        {
            id: '',
            start: '',
            end: '',
            title: '',
            author: ''
        }
    )
    const [valueInputForm,setValueInputForm] = useState(
        {
            author: '',
            title: '',
            start: '',
            end: '',
            resourceId: ''
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
                                title: JSON.parse(child.val() ).title,
                                author: JSON.parse(child.val() ).author,
                                resourceId: JSON.parse(child.val() ).resourceId
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
    
    // handle when select  time
    var  handleSelect = ({ resourceId, start, end }) => {
        
        let myEventFilter  = myEvent.filter(item => {
            return item.resourceId === resourceId;
        })
        let result = true;


        myEventFilter.forEach(element => {
            if (moment(element.start).isBetween(start,end) || moment(element.end).isBetween(start,end)){
                result = false;
            }
        });

        if (result) {
            onOpenInputForm();
            setValueInputForm(
                {
                    ...valueInputForm,
                    start,
                    end,
                    resourceId
                }
            )
            return;
        } 

        alert('Time unavailable.');
    }

    // set data to firebase
    useEffect(
        () => {
            if(valueInputForm.author!=='') {
                 
                let copyMyEvent = [...myEvent];
                copyMyEvent.push(
                    {
                        author: valueInputForm.author,
                        resourceId: valueInputForm.resourceId,
                        start: valueInputForm.start,
                        end: valueInputForm.end,
                        title: valueInputForm.title
                    }
                )
                setMyEvent(copyMyEvent);
                database.ref('meeting/'+createUUID()).set(
                    JSON.stringify(
                        {
                            author: valueInputForm.author,
                            resourceId: valueInputForm.resourceId,
                            start: valueInputForm.start,
                            end: valueInputForm.end,
                            title: valueInputForm.title
                        }
                    )
                )
                setValueInputForm(
                    {
                        author: '',
                        title: '',
                        start: '',
                        end: '',
                        resourceId: ''
                    }
                )
            }
            // eslint-disable-next-line
        },[valueInputForm]
    )

    // hanle when select event 
    var onSelectEvent = event => {
        
        setPresentEvent({
            ...presentEvent,
            id: findEvent(myEvent,event.id).id,
            start: findEvent(myEvent,event.id).start,
            end: findEvent(myEvent,event.id).end,
            title: findEvent(myEvent,event.id).title,
            author: findEvent(myEvent,event.id).author,
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
        setPresentEvent({
            ...presentEvent,
            id: '',
            start: '',
            end: '',
            title: '',
            author: '',
            resourceId: ''
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

    // handle open input form
    var onOpenInputForm = () => {
        setShowInput(true);
    }

    // handle close input form 
    var onCloseInputForm = data => {
        if (data!==null) {
            setValueInputForm(
                {
                    ...valueInputForm,
                    author: data.author,
                    title: data.title
                }
            )
        }
        setShowInput(false);
        
    }


    return (
        <>
            <Calendar 
                selectable='ignoreEvents'
                localizer={localizer}
                events={myEvent}    
                defaultView={Views.DAY}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(Date.now())}
                onSelectEvent={onSelectEvent}
                onSelectSlot={handleSelect}
                step={15}
                views={["work_week", "week", "day", 'agenda']}
                resources={roomMap}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
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
            {
                showInput?
                <MeetingInput 
                    onClose={onCloseInputForm}
                />:
                ''
            }
        </>
    ) 
}

MyCalendar.propTypes = propTypes

export default MyCalendar;