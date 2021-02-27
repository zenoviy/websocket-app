const closeRoom = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.status(200).send({text: 'Close room'})
}

module.exports = {
    closeRoom
}