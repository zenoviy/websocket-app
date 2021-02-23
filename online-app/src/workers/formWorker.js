import { APP_CONSTANTS } from '../store/appConstants' 

export const convrtFormToObjects = ({ form }) => {
    const formFields = {};

    for(let input of form) {
        if(input.name && input.value) {
            if(!input.value) return false
            formFields[input.name] = input.value;
        }
    }
    return formFields
}


export const createJwtLocalStorage = ({token}) => {
    //console.log(APP_CONSTANTS.LOGINED_USER, token)
    localStorage.setItem(APP_CONSTANTS.LOGINED_USER, token)
}

export const readJwtLocalStorage = () => {
    return localStorage.getItem(APP_CONSTANTS.LOGINED_USER)
}

export const clearJwtLocalStorage = ({itemName}) => {
    localStorage.removeItem(itemName)
}
