import { ACTION_TYPE } from '../../actions/actionType'

export const initialState = {
    allGameRooms: null,
}


export const GameRoomsReducer = (store = initialState, payload) => {
    switch(payload.type) {
        case ACTION_TYPE.GET_ALL_GAME_ROOMS :
            return {
                ...store,
                allGameRooms: payload.data
            }
    }
}