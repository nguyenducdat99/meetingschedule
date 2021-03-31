import { resourceMap } from './MeetingRoom';

function getNameRoom(rooms, id) {
    let result = '';

    rooms.forEach(element => {
        if (element.resourceId===id) result=element.resourceTitle
    });

    return result;
}

function MeetingDetail(props) {
    // get props 
    const {onClose, presentEventRec, onDelete, onEdit} = props;
    
    // handler delete event
    var onHandleDelete = () => {
        onDelete(presentEventRec.id);
    }

    return (
        <>
            <div className='detail-wrapper'>
                <div className="detail">
                    <div className='detail__time'>
                        <div className="detail__author">
                            <h3>Author: </h3>
                            <p>
                                {
                                    presentEventRec.author
                                }
                            </p>
                        </div>
                        <div className="detail__start">
                            <h3>Time start: </h3>
                            <p>
                                {
                                    presentEventRec.end.toLocaleTimeString()==='00:00:00'?
                                    'All day':
                                    presentEventRec.start.toLocaleTimeString()
                                }
                            </p>
                        </div>
                        <div className="detail__end">
                            <h3>Time end: </h3>
                            <p>
                                {
                                    presentEventRec.end.toLocaleTimeString()==='00:00:00'?
                                    'All day':
                                    presentEventRec.end.toLocaleTimeString()
                                }
                            </p>
                        </div>
                        <div className="detail__end">
                            <h3>Position: </h3>
                            <p>
                                {
                                    getNameRoom(resourceMap,presentEventRec.resourceId)
                                }
                            </p>
                        </div>
                    </div>
                    <div className='detail__contents'>
                        <h3>Title:</h3>
                        <p>{presentEventRec.title}</p>
                        <button type='text' onClick={onClose}>Close</button>
                        <button type='text' onClick={() => onEdit(presentEventRec)}>Edit</button>
                        <button type='text' onClick={onHandleDelete}>Delete</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MeetingDetail;