import React from 'react'
import { convrtFormToObjects } from '../../workers/formWorker'

const ChatMainComponent = ({context}) => {

    const chatForm = (e) => {
        e.preventDefault()
    }
    return(
        <React.Fragment>
            <div className='chat-text-area'>
                <div className='chat-message-area'>
                    <MessageArea />
                </div>
                <form onSubmit={(e) => {
                    chatForm(e)
                }}>
                    <textarea />
                    <button type='submit'>send</button>
                </form>
            </div>
        </React.Fragment>
    )
}


const MessageArea = ({...props}) => {
    return(
        <div className='message-text-body'>
            <h5>User name</h5>
            <p>message text, chat under construction!</p>
        </div>
    )
}

export default ChatMainComponent