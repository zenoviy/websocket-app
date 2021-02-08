const express = require('express');
const cors = require('cors');
const businessAppLogic = require('./business')


const PORT = 3100;
const app = express();

app.use('api/game-rooms', cors())
app.route('api/game-rooms')
    .get( businessAppLogic.getAllRooms )
    .post( businessAppLogic.openNewRoom )
    .delete( businessAppLogic.closeRoom )

    
app.use('/api/users', cors())
app.route('/api/users')
    .get( businessAppLogic.getAllUser )
    .post( businessAppLogic.postNewUser )
    .delete( businessAppLogic.deleteUser )

app.listen(PORT, () => {
    console.log(`app listen at port ${PORT}`);
})