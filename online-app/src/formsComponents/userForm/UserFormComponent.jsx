import React, { useContext, createContext, useState } from 'react'
import './style.css'
import UserBodyComponent from './UserFormBody'
import { Context } from '../../store/MainAppStore'
import  UserLoginFormComponent from './UserLogInComponent'


/*
    Regisration and varification of user
*/

const UserFormComponent = props => {
    const context = useContext(Context);
    return(
        <React.Fragment>
            <div className='user-form-wrapper'>
                
                <div className='form-inner-body'>
                    <button onClick={() => { props.switchForm() }}>Close</button>
    
                    { !context.appGlobalStore.userIsLogined ? 
                    <RegisterLoginForm /> : 
                    <LogOutForm context={context} />
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
/*
{
                userFormContext.formState.currentForm === 'LOG_IN' ?
                    <LoginFormWrapperComponent /> :
                    <RegistrationWrapperComponent />
            }
*/
const RegisterLoginForm = (props) => {

    const [formState, seyFormState] = useState('LOG_IN')
    const switchCurrentForm = ({formName}) => {
        seyFormState(formName)
    }
    return(
        <React.Fragment>
            <button onClick={() => switchCurrentForm({formName: 'LOG_IN'})}>Login</button>
            <button onClick={() => switchCurrentForm({formName: 'REGISTRATION'})}>Register</button>
            {
                formState === 'LOG_IN' ?
                    <LoginFormWrapperComponent /> :
                    <RegistrationWrapperComponent />
            }
        </React.Fragment>
    )
}
const RegistrationWrapperComponent = (props) => {
    return(
        <React.Fragment> 
            <h1>User Registration</h1>
            <UserBodyComponent />
        </React.Fragment>
    )
}
const LoginFormWrapperComponent = (props) => {
    return(
        <React.Fragment>
            <h1>User Login</h1>
            <UserLoginFormComponent />
        </React.Fragment>
    )
}


const LogOutForm = ({ context }) => {
    return(
        <React.Fragment>
            <h1>Log Out</h1>
            <button onClick={() => {context.logOutUser()}}>Log Out</button>
        </React.Fragment>
    )
}


export default UserFormComponent