const getAllUser = require('./userBaseHandlers/getAllUsers').getAllUser;
const postNewUser = require('./userBaseHandlers/postUser').postNewUser;
const deleteUser = require('./userBaseHandlers/deleteUser').deleteUser;
const userAuthenification = require('./userBaseHandlers/userAutentification').userAuthenification;
const logInUser = require('./userBaseHandlers/logInUser').logInUser;
const logOutUser = require('./userBaseHandlers/logOutUser').logOutUser;


const getAllRooms = require('./gameRoomHandler/getAllRooms').getAllRooms;
const openNewRoom = require('./gameRoomHandler/openNewRoom').openNewRoom;
const closeRoom = require('./gameRoomHandler/closeRoom').closeRoom;
const joitToExistRoom = require('./gameRoomHandler/joinToRoom').joitToExistRoom;

const roomMessenger = require('./gameRoomHandler/roomMessenger').roomMessenger;
const roomSocketValidator = require('./gameRoomHandler/roomMessenger').roomSocketValidator

module.exports = {
    getAllUser,
    postNewUser,
    deleteUser,
    userAuthenification,
    logInUser,
    logOutUser,

    getAllRooms,
    openNewRoom,
    closeRoom,
    joitToExistRoom,

    roomMessenger,
    roomSocketValidator
}