const getAllRooms = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.status(200).send({text: 'All rooms'})
}

module.exports = {
    getAllRooms
}