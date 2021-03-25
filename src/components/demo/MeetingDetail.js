function MeetingDetail(props) {
    // get props 
    const {onClose,presentEventRec, onDelete} = props;
    
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
                    </div>
                    <div className='detail__contents'>
                        <h3>Title:</h3>
                        <p>{presentEventRec.title}</p>
                        <button type='text' onClick={onClose}>Exit</button>&nbsp;
                        <button type='text' onClick={onHandleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MeetingDetail;