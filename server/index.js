const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const WebSocket = require('ws')
const url = require('url')

const businessAppLogic = require('./business')
const appConstant = require('./business/constants')  

const PORT = 3100;
const WS_PORT = 8333;
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


/* WebSocket  */

const webSocketServer = new WebSocket.Server({ 
    port: WS_PORT
});
let clients = {};
webSocketServer.on('connection', function(ws, req) { 
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = Math.floor(Math.random() * new Date().getTime());
    ws._userId = query.id;
    clients[id] = ws;
    

    ws.on('message', function(message) {
        /*
            check user access to room
            - find room, 
            - compare user and room user
        */
        
        console.log(`Message received: ${message} `)
        businessAppLogic.roomSocketValidator({ clients, message })
        /*switch(message.type) {
            case 'userConfirm':
            
            case '':
        }*/
        /*for (var key in clients) {
            clients[key].send(message);
          }
         
            make route  
            - for message
            - for game
        */
    })
    ws.on('close', function() {
        console.log('close connection')
        delete clients[id]
    })
    ws.on('error', function(er) {
        console.log(err)
        ws.send(err)
    })
})

app.listen(PORT, () => {
    console.log(`app listen at port ${PORT} and WebSocket listen at port ${WS_PORT}`)
})