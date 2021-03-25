import { useState } from "react";

function MeetingInput(props) {
    // declare state
    const [info, setInfo] = useState(
        {
            author: '',
            title: ''
        }
    )

    // get props 
    const {onClose} = props;

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

    var onResetInput = () => {
        setInfo(
            {
                ...info,
                author: '',
                title: ''
            }
        )
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
                            <button type='reset' onClick={onResetInput}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MeetingInput;