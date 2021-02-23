import React, { useState, useContext, useRef } from 'react'
import { APP_CONSTANTS } from '../store/appConstants'
import Button from '@material-ui/core/Button'
import AllGamesRoomComponent from './allGamesRoom/AllGamesRoomComponent'
import GameRoomFormComponent from '../formsComponents/gameRoomForm/GameRoomLogin'
import UserLoginFormComponent from '../formsComponents/userForm/UserLogInComponent'
import { Context } from '../store/MainAppStore'

const GameMainComponent = props => {
    const [formStatus, settFormStatus] = useState({
        chosenForm: APP_CONSTANTS.JOIN_TO_ROOM
    })
    const [joinRoomConfirmation, setJoinRoomConfirmation] = useState({
        enterToTheRoom: false,
        roomPasswordAlert: false,
        roomName: null,
        id: null
    })
    const context = useContext(Context);
    const changeFormState = state => {
        settFormStatus({
            chosenForm: state
        })
    }
    const joinToRoom = ({roomName, id}) => {
        setJoinRoomConfirmation({
            ...joinRoomConfirmation,
            roomPasswordAlert: true,
            roomName: roomName,
            id
        })
    }

    return(
        <React.Fragment>
            <h1>Game</h1>
            <Button variant="contained" color={formStatus.chosenForm === APP_CONSTANTS.CREATE_ROOM_FORM? "secondary": "primary"}  onClick={() => { changeFormState(APP_CONSTANTS.CREATE_ROOM_FORM)}}>Create new game room</Button>
            <Button variant="contained" color={formStatus.chosenForm === APP_CONSTANTS.CREATE_ROOM_FORM? "primary": "secondary"} onClick={() => { changeFormState(APP_CONSTANTS.JOIN_TO_ROOM)}}>The game rooms</Button>
            
            {
                formStatus.chosenForm === APP_CONSTANTS.CREATE_ROOM_FORM 
                ? <GameRoomOrLoginComponent context={context} />
                : <AllGamesRoomComponent 
                    joinToRoom={joinToRoom} 
                    joinRoomConfirmation={joinRoomConfirmation} 
                    setJoinRoomConfirmation={setJoinRoomConfirmation} />
            }

        </React.Fragment>
    )
}


const GameRoomOrLoginComponent = ({context}) => {
    //console.log(context.appGlobalStore.userIsLogined, "<<")
    return(
        <React.Fragment>
            <h1>{!context.appGlobalStore.userIsLogined ? 'You must login first!' : ''}</h1>
            { context.appGlobalStore.userIsLogined? 
                <GameRoomFormComponent />: 
                <UserLoginFormComponent />
            }
        </React.Fragment>
    )
}


export default GameMainComponent