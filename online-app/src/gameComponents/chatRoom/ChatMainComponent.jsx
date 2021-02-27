import React, { useEffect, useState } from 'react'
import { convrtFormToObjects, readJwtLocalStorage } from '../../workers/formWorker'
import { message } from '../../workers/webSocketWorkers'

const ChatMainComponent = ({context, socket, roomId}) => {
    const [roomMessages, setRoomMessages] = useState({
        messages: []
    })
    const jswToken = readJwtLocalStorage();
    useEffect(() => {
        socket.onmessage = (e) => {
            console.log(`receive data: ${e.data}`)
            let data = JSON.parse(e.data)
            console.log(data.roomMessages)
            setRoomMessages({messages: data.roomMessages})
        }
        /**/
        let messageData = {
            token: jswToken,
            messageText: '',
            type: 'userConfirm',
            roomId
        };

        socket.addEventListener('open', () => {
            socket.send(JSON.stringify(messageData));
        })
    }, [])
    
    const chatForm = (e) => {
        e.preventDefault()
        
        let messageText = convrtFormToObjects({ form: e.target}).messageText;
        console.log(e.target, messageText)
        let messageData = {
            token: jswToken,
            messageText,
            type: 'sendMessage',
            roomId
        }
        socket.send(JSON.stringify(messageData))
        //messageReceaver()
        /*socket.onmessage = (e) => {
            console.log(`receive data: ${e.data}`)

            let data = JSON.parse(e.data)
            let messages = roomMessages.messages.concat({text: data.messageText})
            console.log(messages, roomMessages, setRoomMessages)
            setRoomMessages({...roomMessages, messages})
        }*/
    }
    
    return(
        <React.Fragment>
            <div className='chat-text-area'>
                <div className='chat-message-area'>
                    { roomMessages.messages.map((message, i) => {
                        return(<MessageArea key={i} message={message} />)
                    })}
                    
                </div>
                <form onSubmit={(e) => {
                    chatForm(e)
                }}>
                    <textarea name='messageText'/>
                    <button type='submit' >send</button>
                </form>
            </div>
        </React.Fragment>
    )
}


const MessageArea = ({message}) => {
    return(
        <div className='message-text-body'>
            <h5>{message.authorName}</h5>
            <p>{message ? message.messageText : 'message text, chat under construction!'}</p>
        </div>
    )
}

export default ChatMainComponent

/*
id: messageTime.getTime(),
authorName: jwtObject.userName,
date: messageTime,
userId: jwtObject.id,
messageText
*/