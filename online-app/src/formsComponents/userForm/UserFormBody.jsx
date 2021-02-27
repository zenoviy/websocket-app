import React, {useState, useContext} from 'react'
import { serverRequest } from '../../workers/apiWorkers'
import { convrtFormToObjects, createJwtLocalStorage } from '../../workers/formWorker'
import { APP_CONSTANTS } from '../../store/appConstants'
import TextField from '@material-ui/core/Input'
import { Context } from '../../store/MainAppStore'

import Button from '@material-ui/core/Button'


const UserBodyComponent = props => {
    const [formState, setFormState] = useState({
        statusCode: 0,
        message: ''
    })
    const context = useContext(Context);

    const formOperations = (e) => {
        const serverRequestDetails = {
            url: APP_CONSTANTS.HOST + APP_CONSTANTS.API_USERS,
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(convrtFormToObjects({form: e.target}))
        }
        serverRequest(serverRequestDetails)
        .then(data => {
            setFormState({ ...formState, statusCode: data.status })
            if(data.status === 202){
                e.target.reset()
            }
            return data.json()
        })
        .then(data => {
            console.log(data)
            setFormState({ ...formState, message: data.message })
            
            if(!data['token']) return
            createJwtLocalStorage({ token: data['token']} )
            context.userCheckAuth()
        })
    }

    return(
        <form onSubmit={(e) => {
            e.preventDefault()
            formOperations(e)
        }}>
            <label>
                <p>*User name</p>
                <TextField type='text' name='userName' required />
            </label>
            <label>
                <p>*User email</p>
                <TextField type='email' name='userEmail' required />
            </label>
            <label>
            <p>*User password</p>
                <TextField type='password' name='userPassword' required />
            </label>

            <p>{ formState.message }</p>
            <Button variant="contained" color="primary" type='submit'>Registration</Button>
        </form>
    )
}

export default UserBodyComponent