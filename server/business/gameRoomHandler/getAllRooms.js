const fs = require('fs')
const appConstants = require('../constants')
const validators = require('../userBaseHandlers/formValidation')
const jwtTokenizer = require('../jwtTokenize')


const getAllRooms = (req, res) => {
    const dbFile = appConstants.staticFileLink + appConstants.staticFileName.GAME_ROOM_DB;
    res.setHeader('Content-type', 'application/json')

    if(fs.existsSync(dbFile)) {
        fs.readFile(dbFile, (err, data) => {
            if(err) res.status(500).send('Error has been occurred')
            let allRoom = JSON.parse(data)
            let roomDataMapped = allRoom.map(roomData => {
                console.log(roomData)
                return {
                    id: roomData.id,
                    roomName: roomData.roomName,
                    dataCreated: roomData.dataCreated
                }
            })
            res.status(200).send({text: `Found rooms ${allRoom.length}`, rooms: roomDataMapped})
        })
    } else return res.status(404).send({message: 'Not found DB not exist'})
}

module.exports = {
    getAllRooms
}