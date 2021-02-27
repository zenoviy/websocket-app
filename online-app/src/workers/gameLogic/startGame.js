export const startGame = () => {

}
export const gameController = ({gameLocalData}) => {
    document.addEventListener('keydown', (e) => {
        controllerEvent(e, gameLocalData)
    })
}
export const removeGameController = () => {
    document.removeEventListener('keydown', (e) => {
        controllerEvent(e)
    })
}
export const controllerEvent = (e, gameLocalData) => {
    const speed = gameLocalData.character.speed;
    switch(true ) {
        case e.keyCode === 87 || e.keyCode === 38:
            gameLocalData.character.y -= speed;
            return // console.log('UP') 
        case e.keyCode === 68 || e.keyCode === 39:
            gameLocalData.character.x += speed;
            return // console.log('Right') 
        case e.keyCode === 83 || e.keyCode === 40:
            gameLocalData.character.y += speed;
            return // console.log('Down') 
        case e.keyCode === 65 || e.keyCode === 37:
            gameLocalData.character.x -= speed;
            return //console.log('Left') 
    }
}

