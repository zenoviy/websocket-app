import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../store/MainAppStore'
import Button from '@material-ui/core/Button'
import UserProfileBodyComponent from './UserProfileBody'

const UserProfileComponent = () => {
    const context = useContext(Context);
    return(
        <React.Fragment>
            { context.appGlobalStore.userIsLogined ? <UserProfileBodyComponent /> : ""}
        </React.Fragment>
    )
}


export default UserProfileComponent