const fs = require('fs')
const appConstants = require('../constants')
const validators = require('./formValidation')
const jwtTokenizer = require('../jwtTokenize')

const userFields = {
    userEmail: {
        type: 'string',
        pattern: ''
    },
    userPassword: {
        type:'string',
        pattern: ''
    }
}

const logInUser = (req, res) => {
    if(!req.body || Object.keys(req.body).length < 1) return res.status(400).send({message: 'The request is empty'})
    if(!validators.formsValidator({interface: userFields, body: req.body})) return res.status(400).send({message: 'Data not valid'})

    const dbFile = appConstants.staticFileLink + appConstants.staticFileName.USERS_DB;
    res.setHeader('Content-type', 'application/json');
    
    if(fs.existsSync(dbFile)){
        fs.readFile(dbFile, (err, data) => {
            if(err) return res.status(500).send({message: 'Error to read the data'})

            let allUsers = JSON.parse(data);
            let user = validators.userExistCompare({allObjects: allUsers, findTarget: req.body})
            console.log(user, 'User')
            if(!user) return res.status(401).send({message: 'user not exist please Rigistrate'})

            const {
                userEmail,
                userName,
                id
            } = user;
            const jwt = jwtTokenizer.tokenizer({ object: { userEmail, userName, id },  privateKey: appConstants.PRIVATE_KEY})
            allUsers = allUsers.map(userDb => {
                if(userDb.userEmail === user.userEmail) {
                    userDb.isLoginned = true;
                }
                return userDb 
            });
            console.log(jwt)

            fs.writeFile(dbFile, JSON.stringify(allUsers), err => {
                if(err) return res.status(500).send({message: 'Error has been occured'})
                res.status(202).send({message: 'User sucessfully Log In', token: jwt})
            })
        })

    } else return res.status()
    //res.send({message: 'Log in'})
}


module.exports = {
    logInUser
}