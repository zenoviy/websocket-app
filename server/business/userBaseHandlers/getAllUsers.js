const getAllUser = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify({ text: "all user list"}))
} 

module.exports = {getAllUser}