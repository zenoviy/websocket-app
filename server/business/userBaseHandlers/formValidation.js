const formsValidator = ({ interface, body }) => {
    if(Object.keys(interface).length != Object.keys(body).length) return false

    for(let [key, val] of Object.entries(body)){
        let isContinue = false;
        for(let [interfaceKey, interfaceVal] of Object.entries(interface)) {
            if(interfaceKey == key && !isContinue) {
                isContinue = true
            }
        }
        if(!isContinue){
            return false
        }
    }
    return true
}
const userExistCompare = ({allObjects, findTarget}) => {
    if(!allObjects.length) return 
    const existUser = allObjects.find(user => user.userEmail === findTarget.userEmail)
    if(existUser) return existUser
    return 
}


module.exports = {
    formsValidator,
    userExistCompare
}