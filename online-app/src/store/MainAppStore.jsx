import React, { createContext, useReducer, useEffect } from 'react'
import * as Reducers from './reducers'
import * as Actions from './actions/actions'
import AppNavigation from '../navigationComponent/AppNavigation'
import { APP_CONSTANTS } from './appConstants'
import { convrtFormToObjects, createJwtLocalStorage, readJwtLOcalStorage } from '../workers/formWorker'
import UserFormComponent from '../formsComponents/userForm/UserFormComponent'

export const Context = createContext(null);
const AppMainStore = props => {
    const [appGlobalStore, setAppStore] = useReducer(Reducers.MainReducer.MainAppReducer, Reducers.MainReducer.initialState);
    
    const clickIncrease = val => {
        setAppStore(Actions.clickIncrease(val))
    }
    const clickDecrease = val => {
        setAppStore(Actions.clickDecrease(val))
    }
    /* Activate login form */
    const showHideLoginForm = () => {
        setAppStore(Actions.showHideLoginForm())
    }

    const userCheckAuth = () => {
        const link = APP_CONSTANTS.HOST + APP_CONSTANTS.API_USERS;
        Actions.userAuth({ link })
        .then(res => setAppStore(res))
        
    }

    /* const logInUser = (userData) => {
        const link = APP_CONSTANTS.HOST + APP_CONSTANTS.API_SINGLE_USER;
        Actions.logInUser({ link, userData })
        .then(res => setAppStore(res))
    } */
    const logOutUser = () => {
        setAppStore(Actions.logOutUser())  
    }


    useEffect(() => {
        userCheckAuth()
    }, [])
    return(
        <React.Fragment>
            <Context.Provider value={{
                appGlobalStore,
                clickIncrease: val => clickIncrease(val),
                clickDecrease: val => clickDecrease(val),
                showHideLoginForm: () => showHideLoginForm(),
                userCheckAuth: () => userCheckAuth(),
                // logInUser: (userData) => logInUser(userData),
                logOutUser: () => logOutUser()
            }}>
                <AppNavigation />
            </Context.Provider>
        </React.Fragment>
    )
}

export default AppMainStore