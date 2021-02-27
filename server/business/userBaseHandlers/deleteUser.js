const deleteUser = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify({text: 'delete User'}))
} 


module.exports = {
    deleteUser
}