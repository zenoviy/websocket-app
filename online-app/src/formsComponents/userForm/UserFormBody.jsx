import React from 'react'


const UserBodyComponent = props => {
    return(
        <form>
            <label>
                <p>*User name</p>
                <input type='text' required />
            </label>
            <label>
                <p>*User email</p>
                <input type='email' required />
            </label>
            <label>
            <p>*User password</p>
                <input type='password' required />
            </label>

            <p></p>
            <button type='submit'>Registration</button>
        </form>
    )
}

export default UserBodyComponent