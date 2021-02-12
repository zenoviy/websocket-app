const fs = require('fs')
const appConstants = require('../constants')
const validators = require('./formValidation')
const jwtTokenizer = require('../jwtTokenize')
/*
    Not in use
*/

const logOutUser = (req, res) => {
    if(!req.body || Object.keys(req.body).length < 1) return res.status(400).send({message: 'The request is empty'})
    if(!validators.formsValidator({interface: userFields, body: req.body})) return res.status(400).send({message: 'Data not valid'})

    const dbFile = appConstants.staticFileLink + appConstants.staticFileName.USERS_DB;
    res.setHeader('Content-type', 'application/json');
    req.body.id = new Date().getTime();
    req.body.isLoginned = true;
    if(!fs.existsSync(dbFile)){
        fs.writeFile(dbFile, JSON.stringify([].concat(req.body)), err => {
            if(err) return res.status(500).send({message: 'Error has been occured'})

            const {
                userEmail,
                userName,
                id
            } = req.body
            const jwt = jwtTokenizer.tokenizer({ object: { userEmail, userName, id },  privateKey: appConstants.PRIVATE_KEY})
            return res.status(200).send({message: 'User sucessfully created You are the first', token: jwt})
        })
    }

    fs.readFile(dbFile, (err, data) => {
        if(err) return res.status(500).send({message: 'Error to read the data'})

        let allUsers = JSON.parse(data);
        if(validators.userExistCompare({allObjects: allUsers, findTarget: req.body})) return res.status(409).send({message: 'user already exist'})
        allUsers = allUsers.concat(req.body);

        fs.writeFile(dbFile, JSON.stringify(allUsers), err => {
            if(err) return res.status(500).send({message: 'Error has been occured'})
            res.status(201).send({message: 'User sucessfully created'})
        })
    })

    res.send({message: 'Log out'})
}


module.exports = {
    logOutUser
}