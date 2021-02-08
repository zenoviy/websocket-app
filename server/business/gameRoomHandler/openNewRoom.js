const openNewRoom = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.status(200).send({text: 'Open New room'})
}

module.exports = {
    openNewRoom
}