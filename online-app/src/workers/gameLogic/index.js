import { 
    startGame, 
    gameController,
    removeGameController } from './startGame'
import { 
    createGameField,
    clearContext,
    createImage,
    createRectangle,
    findCtxSize,
    createCircle
} from './gameView'
import {
    createCharacter
} from './createCharacter'



export {
    /* Game */
    startGame,
    gameController,
    removeGameController,
    /* Character */
    createCharacter,
    /* View */
    createGameField,
    clearContext,
    createImage,
    createRectangle,
    findCtxSize,
    createCircle
}