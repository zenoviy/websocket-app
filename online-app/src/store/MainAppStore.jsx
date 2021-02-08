import React, { createContext, useReducer } from 'react'
import * as Reducers from './reducers'
import * as Actions from './actions/actions'
import AppNavigation from '../navigationComponent/AppNavigation'
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
    return(
        <React.Fragment>
            <Context.Provider value={{
                appGlobalStore,
                clickIncrease: val => clickIncrease(val),
                clickDecrease: val => clickDecrease(val),
                showHideLoginForm: () => showHideLoginForm()
            }}>
                <AppNavigation />
            </Context.Provider>
        </React.Fragment>
    )
}

export default AppMainStore