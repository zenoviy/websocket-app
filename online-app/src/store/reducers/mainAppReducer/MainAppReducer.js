import { ACTION_TYPE } from '../../actions/actionType'

export const initialState = {
    clickCounter: 0,
    userFormOpen: false,
    userIsLogined: false
}

export const MainAppReducer = (store = initialState, payload) => {
    console.log(payload)
    switch(payload.type) {
        case ACTION_TYPE.CLICK_INCREASE: 
            return {
                ...store,
                clickCounter: store.clickCounter + payload.value
            }
        case ACTION_TYPE.CLICK_DECREASE:
            return {
                ...store,
                clickCounter: store.clickCounter + payload.value * -1 
            }
        case ACTION_TYPE.USER_FORM_SWITCH:
            return {
                ...store,
                userFormOpen: !store.userFormOpen
            }
        case ACTION_TYPE.USER_CHECK_AUTH: 
            return {
                ...store,
                userIsLogined: payload.value
            }
        case ACTION_TYPE.LOG_OUT_USER:
            console.log('unloged')
            return {
                ...store,
                userIsLogined: false
            }
        /* case ACTION_TYPE.LOG_IN_USER:
            return {
                ...store,
                userIsLogined: true
            } */
    }
}