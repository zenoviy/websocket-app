const express = require('express');


const PORT = 3100;
const app = express();



app.listen(PORT, () => {
    console.log(`app listen at port ${PORT}`);
})