import { ACTION_TYPE } from './actionType'

import { APP_CONSTANTS } from '../../store/appConstants'
import { serverRequest } from '../../workers/apiWorkers'
import { clearJwtLocalStorage } from '../../workers/formWorker'

import { readJwtLocalStorage } from '../../workers/formWorker'



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

/* Login Form */
export const showHideLoginForm = () => {
    return {
        type: ACTION_TYPE.SWITCH_USER_FORM
    }
}

export const userAuth = ({ link }) => {
    const jwt = readJwtLocalStorage() || null;
    const requestSettings = {
        url: link,
        body: JSON.stringify({token: jwt}),
        headers: { 'Content-Type': "application/json"},
        method: 'PUT'
    }
    return new Promise((res, rej) => {
        let statusCode = null;
        serverRequest(requestSettings)
        .then(data => {
            statusCode = data.status;
            return data.json()}
        )
        .then(data => { 
            console.log(data, statusCode)
            res({
                type: ACTION_TYPE.USER_CHECK_AUTH,
                value: statusCode === 202 ? true : false
            })
        })
    })
}

export const logOutUser = () => {
    clearJwtLocalStorage({itemName: APP_CONSTANTS.LOGINED_USER})
    return {
        type: ACTION_TYPE.LOG_OUT_USER
    }
}


/* All game rooms */

export const getAllGameRomsData = ({ link }) => {
    return new Promise((res, rej) => {
        const requestSettings = {
            url: link,
            method: 'GET',
        }
        serverRequest(requestSettings)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            res({
                type: ACTION_TYPE.GET_ALL_GAME_ROOMS,
                data: data.rooms
            })
        })
    }) 
}