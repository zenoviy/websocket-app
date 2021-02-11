import React, { useState, useContext } from 'react'
import { APP_CONSTANTS } from '../store/appConstants'
import Button from '@material-ui/core/Button'
import AllGamesRoomComponent from './allGamesRoom/AllGamesRoomComponent'
import GameRoomFormComponent from '../formsComponents/gameRoomForm/GameRoomLogin'
import UserLoginFormComponent from '../formsComponents/userForm/UserLogInComponent'
import { Context } from '../store/MainAppStore'

const GameMainComponent = props => {
    const [formStatus, settFormStatus] = useState({
        chosenForm: APP_CONSTANTS.CREATE_ROOM_FORM
    })
    const context = useContext(Context);
    const changeFormState = state => {
        settFormStatus({
            chosenForm: state
        })
    }

    return(
        <React.Fragment>
            <h1>Game</h1>
            <Button variant="contained" color="primary" onClick={() => { changeFormState(APP_CONSTANTS.JOIN_TO_ROOM) }}>Join to the game room</Button>
            <Button variant="contained" color="primary" onClick={() => { changeFormState(APP_CONSTANTS.CREATE_ROOM_FORM) }}>Create new game room</Button>
            {
                formStatus.chosenForm === APP_CONSTANTS.CREATE_ROOM_FORM 
                ? <GameRoomFormComponent />
                : <AllGamesRoomComponent context={context} />
            }

        </React.Fragment>
    )
}


const GameRoomOrLoginComponent = ({context}) => {
    return(
        <React.Fragment>
            { context.appGlobalStore.userIsLogined? 
                <AllGamesRoomComponent /> : 
                <UserLoginFormComponent />
            }
        </React.Fragment>
    )
}

export default GameMainComponent