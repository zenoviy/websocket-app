const fs = require('fs')
const appConstants = require('../constants')
const validators = require('../userBaseHandlers/formValidation')
const jwtTokenizer = require('../jwtTokenize')

const openNewRoom = (req, res) => {
    if(!req.body || Object.keys(req.body).length < 1) return res.status(400).send({message: 'The request is empty'})
    const dbFile = appConstants.staticFileLink + appConstants.staticFileName.GAME_ROOM_DB;
    res.setHeader('Content-type', 'application/json')
    const {
        id,
        userName,
        userEmail,
    } = jwtTokenizer.tokenDecoded({token: req.body['token'], privateKey: appConstants.PRIVATE_KEY});
    const roomNewRoomData = {
        id: new Date().getTime(),
        dataCreated: new Date().getTime(),
        roomName: req.body['roomName'],
        roomPassword: req.body['roomPassword'],
        userToken: req.body['token'],
        roomData: {},
        roomPlayersData: {},
        roomChatData: {}
    }
    console.log(roomNewRoomData)
    if(!fs.existsSync(dbFile)){
        fs.writeFile(dbFile, JSON.stringify([].concat(roomNewRoomData)), err => {
            if(err) return res.status(500).send({message: 'Error has been occured'})
            return res.status(202).send({text: 'Data add to file Open New room'})
        })
    } else {
        fs.readFile(dbFile, (err, data) => {
            if(err) return res.status(500).send({message: 'Error has been occured'})

            let allRoomsData = JSON.parse(data);
            allRoomsData = allRoomsData.concat(roomNewRoomData)
            fs.writeFile(dbFile, JSON.stringify(allRoomsData), err => {
                if(err) return res.status(500).send({message: 'Error has been occured'})
                return res.status(202).send({text: 'Open New room'})
            })
        })
        
        
    }

    
}

module.exports = {
    openNewRoom
}