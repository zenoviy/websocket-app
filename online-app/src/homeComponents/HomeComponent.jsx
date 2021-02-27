import React, {useContext} from 'react'
import { Context } from '../store/MainAppStore'

const HomeComponent = props => {
    const context = useContext(Context);
    return(
        <React.Fragment>
            <h1>Home</h1>
            <div>
                <h1>Online</h1>
                <h2>{context.appGlobalStore.clickCounter}</h2>
                <button onClick={() => { context.clickIncrease(1) }}>+1</button>
                <button onClick={() => { context.clickDecrease(1) }}>-1</button>
            </div>
        </React.Fragment>
    )
}

export default HomeComponent