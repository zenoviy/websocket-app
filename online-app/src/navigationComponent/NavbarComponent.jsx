import React, {useContext, useState, createContext } from 'react'
import { NavLink, Link } from 'react-router-dom'

import UserFormComponent from '../formsComponents/userForm/UserFormComponent'


const NavbarComponent = props => {
    const [formState, setFormState] = useState({
        formActive: false
    })
    const switchForm = () => {
        setFormState({
            formActive: !formState.formActive
        })
    }
    const newSwitch = switchForm.bind(formState)
    return(
        <React.Fragment>
            { formState.formActive ? <UserFormComponent switchForm={ switchForm } /> : ''}
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/game'>Game</NavLink></li>
                </ul>  
                <button onClick={() => { switchForm() }}>Login</button>
            </nav>
        </React.Fragment>
    )
}

export default NavbarComponent