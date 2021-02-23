const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const businessAppLogic = require('./business')
const appConstant = require('./business/constants')  

const PORT = 3100;
const app = express();

app.use(bodyParser.json())

app.use('/api/game-rooms', cors())
//app.use('/api/game-rooms', express.static(appConstant.staticFileLink))
app.route('/api/game-rooms')
    .get( businessAppLogic.getAllRooms )
    .post( businessAppLogic.openNewRoom )
    .delete( businessAppLogic.closeRoom )
    .put( businessAppLogic.joitToExistRoom )

app.use('/api/users', express.static(appConstant.staticFileLink))
app.use('/api/users', cors())
app.route('/api/users')
    .get( businessAppLogic.getAllUser )
    .post( businessAppLogic.postNewUser )
    .delete( businessAppLogic.deleteUser )
    .put( businessAppLogic.userAuthenification )

    //  User login logout
app.use('/api/single-user', express.static(appConstant.staticFileLink))
app.use('/api/single-user', cors())
app.route('/api/single-user')
    .post( businessAppLogic.logInUser )
    .delete( businessAppLogic.logOutUser )


app.listen(PORT, () => {
    console.log(`app listen at port ${PORT}`)
})