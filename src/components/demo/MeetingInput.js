import { useEffect, useState } from "react";
import { resourceMap } from './MeetingRoom';

function getHoursAndMinute(time) {
    if (time === '') return;
    return '' + time.getHours() + ':' + time.getMinutes();
}

function getNameRoom(rooms, id) {
    let result = '';

    rooms.forEach(element => {
        if (element.resourceId===id) result=element.resourceTitle
    });

    return result;
}

function MeetingInput(props) {
    // declare state
    const [info, setInfo] = useState(
        {
            author: '',
            title: ''
        }
    )

    // get props 
    const {onClose, eventEditRec, valueInputFormRec} = props;

    // load data edit
    useEffect(
        () => {
            if (eventEditRec!==null) {
                setInfo({
                    ...info,
                    author: eventEditRec.author,
                    title: eventEditRec.title
                })
            }
        // eslint-disable-next-line
        },[eventEditRec]
    )

    // handle when close form input
    var onHandleClose = () => {
        onClose(info);
    }

    // handle when submit
    var onHandleSubmit = event => {
        event.preventDefault();
        onHandleClose()
        onResetInput();
    }

    // handle when change value input
    var onHandleChange = event => {
        let value = event.target.value;
        let name = event.target.name;

        setInfo({
            ...info,
            [name]: value
        })
    }

    // clear input value
    var onResetInput = () => {
        setInfo(
            {
                ...info,
                author: '',
                title: ''
            }
        )
    }

    // handler when click cancel
    var onCancelForm = () => {
        onClose(null);
        onResetInput();
    }

    return (
        <>
            <div className='detail-wrapper'>
                <div className='meeting-input'>
                    <form action='' method='' onSubmit={onHandleSubmit}>
                        <div className="form-group">
                            <label>
                                <p>Author:</p>
                                <input 
                                    className='form-control'
                                    name="author"
                                    value={info.author}
                                    onChange={onHandleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <p>Title:</p>
                                <input 
                                    className='form-control'
                                    name='title'
                                    value={info.title}
                                    onChange={onHandleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className='form-group'>
                            <button type='submit'>Ok</button>&nbsp;&nbsp;
                            <button type='submit' onClick={onResetInput}>Reset</button>&nbsp;&nbsp;
                            <button type='reset' onClick={onCancelForm}>Cancel</button>
                        </div>
                        <div className='notes'>
                            <p><u><b>Notes:</b></u> 
                                {
                                    eventEditRec===null?
                                    (
                                        ' The meeting starts from ' + 
                                        getHoursAndMinute(valueInputFormRec.start) +
                                        ' to ' + 
                                        getHoursAndMinute(valueInputFormRec.end) + 
                                        ' in ' + 
                                        getNameRoom(resourceMap,valueInputFormRec.resourceId)
                                    ):
                                    (
                                        'The meeting starts from ' + 
                                        getHoursAndMinute(eventEditRec.start) +
                                        ' to ' + 
                                        getHoursAndMinute(eventEditRec.end) + 
                                        ' in ' +
                                        getNameRoom(resourceMap,eventEditRec.resourceId)
                                    )
                                }
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MeetingInput;