import { ACTION_TYPE } from './actionType'



/* Clickers */

export const clickIncrease = val => {
    return {
        type: ACTION_TYPE.CLICK_INCREASE,
        value: val
    }
}

export const clickDecrease = val => {
    return {
        type: ACTION_TYPE.CLICK_DECREASE,
        value: val
    }
}