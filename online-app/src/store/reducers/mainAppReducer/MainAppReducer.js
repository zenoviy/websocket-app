import { ACTION_TYPE } from '../../actions/actionType'

export const initialState = {
    clickCounter: 0
}

export const MainAppReducer = (store = initialState, payload) => {
    switch(payload.type) {
        case ACTION_TYPE.CLICK_INCREASE: 
            return {
                clickCounter: store.clickCounter + payload.value
            }
        case ACTION_TYPE.CLICK_DECREASE:
            return {
                clickCounter: store.clickCounter + payload.value * -1 
            }
    }
}