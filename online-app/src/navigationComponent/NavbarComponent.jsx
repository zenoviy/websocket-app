import React, {useContext, useState, createContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './style.css'

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
            <nav className='app-main-naviagation'>
                <div>
                    <ul>
                        <li><NavLink to='/' exact activeClassName="selected" >Home</NavLink></li>
                        <li><NavLink to='/game' exact activeClassName="selected">Game</NavLink></li>
                    </ul>
                    <div className='menu-login-items'>
                        <button onClick={() => { switchForm() }} >{ context.appGlobalStore.userIsLogined ? 'Log Out' : 'Registration form'}</button>
                        { context.appGlobalStore.userIsLogined ?  <NavLink to='/profile' exact className='user-profile'>Profile</NavLink> : "unlogined" }
                    </div>  
                    
                </div>
                
            </nav>
        </React.Fragment>
    )
}

export default NavbarComponent