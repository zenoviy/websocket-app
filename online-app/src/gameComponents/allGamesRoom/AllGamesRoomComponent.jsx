import React, { useContext, useEffect, useState } from 'react'
import GameRoomJoin from '../../formsComponents/gameRoomForm/GameRoomJoin'
import { Context } from '../../store/MainAppStore'


/*
    Regisration and varification of user
*/
const AllGamesRoomComponent = ({joinToRoom, joinRoomConfirmation, setJoinRoomConfirmation}) => {
    const context = useContext(Context);

    useEffect(() => {
        context.getAllGameRomsData()
    }, [])
    return(
        <React.Fragment>
            {!joinRoomConfirmation.roomPasswordAlert ? null : 
                <GameRoomJoin 
                    joinRoomConfirmation={joinRoomConfirmation}
                    setJoinRoomConfirmation={setJoinRoomConfirmation} />}
            <h1>All Games Room</h1>
            { context.gameRoomsData.allGameRooms ? <GameRoomCards 
                    allGameRooms={context.gameRoomsData.allGameRooms} 
                    joinToRoom={joinToRoom}
                    joinRoomConfirmation={joinRoomConfirmation}
            /> : 'No Rooms now'}
        </React.Fragment>
    )
}

const GameRoomCards = ({allGameRooms, joinToRoom, joinRoomConfirmation}) => {
    return(
        <React.Fragment>
            <ul>
               { allGameRooms.map(room => {
                   let date = new Date(room.dataCreated)
                   let time = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hours: date.getHours(),
                        minutes: date.getMinutes(),
                        seconds: date.getSeconds()
                   }
                   return(
                        <li key={room.id} className={room.id === joinRoomConfirmation.id ? 'room-list selected-room-list' : 'room-list'}>
                           <span>{room.roomName}</span>
                           <span>   Data created {time.year}/{time.month}/{time.day} {time.hours}:{time.minutes}:{time.seconds}</span>
                           <button onClick={() => joinToRoom({roomName: room.roomName, id: room.id})}>Join the room</button>
                        </li>
                   )
               }) } 
            </ul>
        </React.Fragment>
    )
}

export default AllGamesRoomComponent