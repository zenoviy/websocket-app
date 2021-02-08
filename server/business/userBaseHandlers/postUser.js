const postNewUser = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify({text: 'Post user'}))
}

module.exports = {
    postNewUser
}