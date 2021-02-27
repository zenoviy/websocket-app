const jwt = require('jsonwebtoken');


const tokenizer = ({ object, privateKey }) => {
   let token = jwt.sign(object, privateKey)
   //console.log(token)
   return token
}

const tokenDecoded = ({ token, privateKey }) => {
    //console.log(jwt, privateKey)
    try {
        const decoded = jwt.verify(token, privateKey);
        //console.log(decoded, 'decoded')
        return decoded
    } catch (err) {
        console.log('error')
        return false
    }
}


module.exports = {
    tokenizer,
    tokenDecoded
}