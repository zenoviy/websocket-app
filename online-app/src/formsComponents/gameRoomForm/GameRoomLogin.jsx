import React from 'react'
import { useHistory } from 'react-router-dom'

/*
    Create the game Room
*/
const GameRoomFormComponent = props => {
    let history = useHistory();
    return(
        <React.Fragment>
            <h1>Game Room Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                const gameId = new Date().getTime();
                history.push(`/game/${gameId}`)
            }}>
                <label>
                    <p>*Enter room name</p>
                    <input type='text' name='roomName' required />
                </label>
                <label>
                    <p>*Create room password</p>
                    <input type='password' name='roomPassword' required pattern='[A-Za-z]' />
                </label>
                <p></p>
                <button type='submit'>Create room</button>
            </form>
        </React.Fragment>
    )
}

export default GameRoomFormComponent