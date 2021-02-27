const fs = require('fs')
const appConstants = require('../constants')
const validators = require('../userBaseHandlers/formValidation')
const jwtTokenizer = require('../jwtTokenize')

/*
 WebSocket Messenger
*/


const roomMessenger = () => {

}

const roomSocketValidator = ({ clients, message}) => {
    const userDbLink = appConstants.staticFileLink + appConstants.staticFileName.USERS_DB;
    const roomDbLink = appConstants.staticFileLink + appConstants.staticFileName.GAME_ROOM_DB;
    
    let requestParams = JSON.parse(message);
    const jwtObject = jwtTokenizer.tokenDecoded({token: requestParams.token, privateKey: appConstants.PRIVATE_KEY});
    //console.log(requestParams)
    if(fs.existsSync(userDbLink) && fs.existsSync(roomDbLink)) {
        fs.readFile(roomDbLink, (err, data) => { 
            let allRooms = JSON.parse(data);

            let messageTime = new Date();
            let allRoomsWithUpdatedChat = allRooms.map(room => {
                if(room.id == requestParams.roomId && requestParams.type === 'sendMessage'){
                    room.roomMessages.push({
                        id: messageTime.getTime(),
                        authorName: jwtObject.userName,
                        date: messageTime,
                        userId: jwtObject.id,
                        messageText: requestParams.messageText
                    })
                }
                return room
            }) 
            const currentRoom = validators.userExistCompare({allObjects: allRooms, findTarget: {id: requestParams.roomId}, compareKey: 'id'})
            //console.log(allRoomsWithUpdatedChat)
            //userConfirm
            let responseMessage = {
                roomMessages: currentRoom.roomMessages
            }
            if(requestParams.type === 'userConfirm') {
                socketResponse({responseMessage, currentRoom})
                return
            }

            fs.writeFile(roomDbLink, JSON.stringify(allRoomsWithUpdatedChat), err => {
                if(err) return console.log({message: 'Error has been occured'})
                socketResponse({responseMessage, currentRoom})
            })
            
        })
    }
    function socketResponse({responseMessage, currentRoom}){
        for (var key in clients) {
            if(currentRoom.id != clients[key]._userId) continue
                clients[key].send(JSON.stringify(responseMessage));
        }
    }

}



module.exports = {
    roomMessenger,
    roomSocketValidator
}