const fs = require('fs')
const appConstants = require('../constants')
const validators = require('./formValidation')
const jwtTokenizer = require('../jwtTokenize')

const userAuthenification = (req, res) => {
    if(!Object.keys(req.body).length) return res.status(403).send({message: 'You are not authorizated'})
    res.setHeader('Content-type', 'application/json');
    const dbFile = appConstants.staticFileLink + appConstants.staticFileName.USERS_DB;
    if(fs.existsSync(dbFile)) {
        fs.readFile(dbFile, (err, data) => {
            const users = JSON.parse(data);

            const jwtObject = jwtTokenizer.tokenDecoded({token: req.body['token'], privateKey: appConstants.PRIVATE_KEY})
            if(!jwtObject) return res.status(401).send({message: 'You are not authorizated'})
            const user = validators.userExistCompare({allObjects: users, findTarget: jwtObject, compareKey: 'userEmail'})
            
            if(!user) return res.status(404).send({message: 'This user not exist'})  
            const {
                userEmail,
                userName,
                id
            } = user
            const jwt = jwtTokenizer.tokenizer({ object: { userEmail, userName, id },  privateKey: appConstants.PRIVATE_KEY})
            return res.status(202).send({message: 'authentification', token: jwt}) 
            //if(!user.isLoginned) return res.status(401).send({message: 'Please Log in'})  
        })
    } else return res.status(409).send({message: 'You need register a new profile'})
}


module.exports = {
    userAuthenification
}