import React, { useState } from 'react'
import { APP_CONSTANTS } from '../store/appConstants'
import AllGamesRoomComponent from './allGamesRoom/AllGamesRoomComponent'
import GameRoomFormComponent from '../formsComponents/gameRoomForm/GameRoomLogin'

const GameMainComponent = props => {
    const [formStatus, settFormStatus] = useState({
        chosenForm: APP_CONSTANTS.CREATE_ROOM_FORM
    })
    const changeFormState = state => {
        settFormStatus({
            chosenForm: state
        })
    }

    return(
        <React.Fragment>
            <h1>Game</h1>
            <button onClick={() => { changeFormState(APP_CONSTANTS.JOIN_TO_ROOM) }}>Join to the game room</button>
            <button onClick={() => { changeFormState(APP_CONSTANTS.CREATE_ROOM_FORM) }}>Create new game room</button>
            {
                formStatus.chosenForm === APP_CONSTANTS.CREATE_ROOM_FORM 
                ? <GameRoomFormComponent />
                : <AllGamesRoomComponent />
            }

        </React.Fragment>
    )
}

export default GameMainComponent