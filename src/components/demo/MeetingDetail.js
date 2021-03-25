function MeetingDetail(props) {
    // get props 
    const {onClose,presentEventRec, onDelete} = props;
    
    var onHandleDelete = () => {
        onDelete(presentEventRec.id);
    }

    return (
        <>
            <div className='detail-wrapper'>
                <p><u>Thoát</u></p>
                <span><p><u>Xóa</u></p></span>
                <div className="detail">
                    <div className='detail__time'>
                        <div className="detail__start">
                            <h3>Thời gian bắt đầu: </h3>
                            <p>{presentEventRec.start.toLocaleTimeString()}</p>
                        </div>
                        <div className="detail__end">
                            <h3>Thời gian kết thúc</h3>
                            <p>{presentEventRec.end.toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div className='detail__contents'>
                        <h3>Nội dung cuộc họp:</h3>
                        <p>{presentEventRec.title}</p>
                        <button type='text' onClick={onClose}>Thoát</button>&nbsp;
                        <button type='text' onClick={onHandleDelete}>Xóa</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MeetingDetail;