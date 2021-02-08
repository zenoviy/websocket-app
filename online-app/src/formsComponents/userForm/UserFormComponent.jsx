import React from 'react'
import './style.css'
import UserBodyComponent from './UserFormBody'

/*
    Regisration and varification of user
*/
const UserFormComponent = props => {
    return(
        <React.Fragment>
            <div className='user-form-wrapper'>
                <div className='form-inner-body'>
                    <button onClick={() => { props.switchForm() }}>Close</button>
                    <h1>User Login</h1>
                    <UserBodyComponent />
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default UserFormComponent