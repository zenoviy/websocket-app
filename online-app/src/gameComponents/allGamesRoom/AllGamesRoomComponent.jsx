import React, { useContext, useEffect } from 'react'
import { Context } from '../../store/MainAppStore'
/*
    Regisration and varification of user
*/
const AllGamesRoomComponent = props => {
    const context = useContext(Context);

    useEffect(() => {
        context.getAllGameRomsData()
    }, [])
    return(
        <React.Fragment>
            <h1>All Games Room</h1>
            { context.gameRoomsData.allGameRooms ? <GameRoomCards allGameRooms={context.gameRoomsData.allGameRooms} /> : 'No Rooms now'}
        </React.Fragment>
    )
}

const GameRoomCards = ({allGameRooms}) => {
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
                       <li key={room.id}>
                           <span>{room.roomName}</span>
                           <span>   Data created {time.year}/{time.month}/{time.day} {time.hours}:{time.minutes}:{time.seconds}</span>
                       </li>
                   )
               }) } 
            </ul>
        </React.Fragment>
    )
}

export default AllGamesRoomComponent