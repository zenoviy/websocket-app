import React, {useContext, useState, createContext } from 'react'
import { NavLink, Link } from 'react-router-dom'

import UserFormComponent from '../formsComponents/userForm/UserFormComponent'
import { Context } from '../store/MainAppStore'

const NavbarComponent = props => {
    const [formState, setFormState] = useState({
        formActive: false,
        currentForm: 'LOG_IN'
    })
    const context = useContext(Context)  // appGlobalStore
    const switchForm = () => {
        setFormState({
            ...formState,
            formActive: !formState.formActive
        })
    }
    const switchCurrentForm = ({formName}) => {
        console.log(1)
        setFormState({
            ...formState,
            currentForm: formName
        })
    }

    return(
        <React.Fragment>
            { formState.formActive ? <UserFormComponent 
                    switchForm={ switchForm } 
                    switchCurrentForm={ switchCurrentForm }
                    formState={ formState }
                /> : ''}
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/game'>Game</NavLink></li>
                </ul>  
                <button onClick={() => { switchForm() }} >{ context.appGlobalStore.userIsLogined ? 'Log Out' : 'Registration form'}</button>
                { context.appGlobalStore.userIsLogined ?  <NavLink to='/profile'>Profile</NavLink> : "unlogined" }
            </nav>
        </React.Fragment>
    )
}

export default NavbarComponent