const fs = require('fs')
const appConstants = require('../constants')
const validators = require('../userBaseHandlers/formValidation')
const jwtTokenizer = require('../jwtTokenize')


/*
    Join user to exist room 
    if user exist
    if the password compare and the room exist
    user data add to game room
*/
const joitToExistRoom = (req, res) => { 
    res.setHeader('Content-type', 'application/json')
    const dbFile = appConstants.staticFileLink + appConstants.staticFileName.GAME_ROOM_DB;
    const userDb = appConstants.staticFileLink + appConstants.staticFileName.USERS_DB;

    if(fs.existsSync(dbFile) && fs.existsSync(userDb)) {
        fs.readFile(dbFile, (err, data) => {
            if(err) return res.status(500).send('Error has been occurred')
            const {
                roomPassword,
                roomName,
                id,
                token
            } = req.body;

            fs.readFile(userDb, (err, userData) => {
                if(err) return res.status(500).send('Error has been occurred')
                const jwtObject = jwtTokenizer.tokenDecoded({token, privateKey: appConstants.PRIVATE_KEY})
                const users = JSON.parse(userData);
                const user = validators.userExistCompare({allObjects: users, findTarget: jwtObject, compareKey: 'userEmail'})
            
                if(!user) return res.status(404).send({message: 'You are not logined or registered'}) 
                let allRoom = JSON.parse(data);
                const currentRoom = validators.userExistCompare({allObjects: allRoom, findTarget: {id}, compareKey: 'id'})
                
                if(currentRoom.roomPassword != roomPassword) return res.status(404).send({message: 'Wrong password'})
                console.log(allRoom, currentRoom)
                res.status(202).send({message: 'Join to room', roomLink: currentRoom.roomLink})
            })

            
        })
    } else return res.status(404).send({message: 'Not found DB not exist'})
    
}


module.exports = {
    joitToExistRoom
}