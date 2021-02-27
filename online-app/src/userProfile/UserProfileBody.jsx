import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../store/MainAppStore'
import Button from '@material-ui/core/Button'

const UserProfileBodyComponent = () => {
    const context = useContext(Context);
    return(
        <div>
            <h2>User Profile</h2>
            <Button variant="contained" color="secondary" onClick={() => { context.logOutUser() }}>Log out</Button>
        </div>
    )
}


export default UserProfileBodyComponent