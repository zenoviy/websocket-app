import React, {useContext, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { APP_CONSTANTS } from '../../store/appConstants'
import { serverRequest } from '../../workers/apiWorkers'
import { convrtFormToObjects, createJwtLocalStorage, readJwtLocalStorage } from '../../workers/formWorker'

import { Context } from '../../store/MainAppStore'


/*
    Create the game Room
*/
const GameRoomFormComponent = props => {
    let history = useHistory();
    const [formState, setFormState] = useState({
        statusCode: 0,
        message: ''
    })
    const context = useContext(Context);
    
    const formOperations = (e) => {
        const jswToken = readJwtLocalStorage();

        const formObject = convrtFormToObjects({form: e.target});
        formObject.token = jswToken;
        const serverRequestDetails = {
            url: APP_CONSTANTS.HOST + APP_CONSTANTS.API_ROOMS,
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(formObject),
        }

        let statusCode = null
        serverRequest(serverRequestDetails)
        .then(data => {
            setFormState({ ...formState, statusCode: data.status })
            if(data.status === 202){
                e.target.reset()
            }
            statusCode = data.status
            return data.json()
        })
        .then(data => {
            console.log(data, formState.statusCode)
            setFormState({ ...formState, message: data.message })
            
            if(statusCode !== 202) return
            history.push(`/game/${data.roomLink}`)
        })
    }
    return(
        <React.Fragment>
            <h1>Game Room Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                formOperations(e) 
            }}>
                <label>
                    <p>*Enter room name</p>
                    <input type='text' name='roomName' required />
                </label>
                <label>
                    <p>*Create room password</p>
                    <input type='password' name='roomPassword' required minLength='5' maxLength='10' />
                </label>
                <p></p>
                <button type='submit'>Create room</button>
            </form>
        </React.Fragment>
    )
}

export default GameRoomFormComponent