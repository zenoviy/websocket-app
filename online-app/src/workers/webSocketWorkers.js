import { APP_CONSTANTS } from '../store/appConstants'


export const message = ({ 
    socket
}) => {

    socket.addEventListener('open', () => {
        console.log('Conection established')
    })

    socket.addEventListener('close', (e) => {
        if (e.wasClean) {
            console.log('Conection closed');
        } else {
            console.log('Conection break');
        }
        console.log(`Code:${e.code} reason: ${e.reason}`);
    })

    /*socket.addEventListener('message', (e) => {
        console.log(`receive data: ${e.data}`)
        let messages = roomMessages.messages.concat({text: e.data})
        console.log(messages, roomMessages, setRoomMessages)
        setRoomMessages({...roomMessages, messages})
    })*/

    socket.addEventListener('error', (e) => {
        console.log(`Error has been occurred ${e.message}`)
    })

    //socket.send(body);
}