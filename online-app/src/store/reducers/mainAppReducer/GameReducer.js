import { ACTION_TYPE } from '../../actions/actionType'

export const initialState = {
    gameEngine: null,
    gameReady: false,
    ctx: null
}


export const GameRoomsReducer = (store = initialState, payload) => {
    switch(payload.type) {
        case ACTION_TYPE.START_ENGINE :
            return {
                ...store,
                gameEngine: payload.engine,
                gameReady: true
            }
        case ACTION_TYPE.STOP_ENGINE :
            clearInterval(store.gameEngine)
            return {
                ...store,
                gameEngine: null,
                gameReady: false
            }
        case ACTION_TYPE.SET_CTX :
            return {
                ...store,
                ctx: payload.ctx
            }
    }
}