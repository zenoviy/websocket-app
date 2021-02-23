import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { convrtFormToObjects, readJwtLocalStorage } from '../../workers/formWorker'
import { serverRequest } from '../../workers/apiWorkers'
import { APP_CONSTANTS } from '../../store/appConstants'



/*
    When the room password exist and user logined app redirect to the room
*/
const GameRoomJoin = ({joinRoomConfirmation, setJoinRoomConfirmation}) => {
    let history = useHistory();
    const [formState, setFormState] = useState({
        statusCode: 0,
        message: ''
    })
    const joinToGameAction = (e) => {
        e.preventDefault()
        const jswToken = readJwtLocalStorage();
        const joinRoomData = convrtFormToObjects({form: e.target}); 
        joinRoomData.roomName = joinRoomConfirmation.roomName;
        joinRoomData.id = joinRoomConfirmation.id;
        joinRoomData.token = jswToken;

        let status = null;
        
        const serverRequestDetails = {
            url: APP_CONSTANTS.HOST + APP_CONSTANTS.API_ROOMS,
            method: 'PUT',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(joinRoomData)
        }
        serverRequest(serverRequestDetails)
        .then(data => {
            setFormState({ ...formState, statusCode: data.status })
            if(data.status === 202){
                e.target.reset()
            }
            return data.json()
        })
        .then(data => {
            console.log(data)
            setFormState({ ...formState, message: data.message })

            if(!data.roomLink) return
            history.push(`/game/${data.roomLink}`)
        })
    }
    return(
        <React.Fragment>
            <div>
                <button onClick={() => { setJoinRoomConfirmation({
                    ...joinRoomConfirmation,
                    roomPasswordAlert: false,
                    roomName: null,
                    id: null
                 })}}>Closed</button>
                <h3>Confirm Password to room {joinRoomConfirmation.roomName}</h3>
                <form onSubmit={(e) => {
                    joinToGameAction(e)
                }}>
                    <label>
                        <p>*room password</p>
                        <input type='password' required  name='roomPassword'/>
                    </label>
                    <p>{formState.message}</p>
                    <button type='submit'>Join to Game room</button>
                </form>
            </div>
        </React.Fragment>
    )
}



export default GameRoomJoin