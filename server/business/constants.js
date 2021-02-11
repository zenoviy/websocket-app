const fs = require('fs')
const path = require('path')

const staticFileLink = path.join(__dirname +'/../public/db');
const PRIVATE_KEY = 'sAd8f#$fdg^fAS12#bMt';

const staticFileName = {
    USERS_DB: '/userData.json',
    GAME_ROOM_DB: '/gameRoom.json'
}

module.exports = {
    staticFileLink,
    staticFileName,
    PRIVATE_KEY
}