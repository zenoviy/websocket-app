import React from 'react'
import {  
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from 'react-router-dom'
import HomeComponent from '../homeComponents/HomeComponent'
import GameMainComponent from '../gameComponents/GameMainScript'

const AppNavigation = () => {
    return(
        <Router>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/game'>Game</NavLink></li>
            </ul>
            <Switch>
                <Route exact path='/'>
                    <HomeComponent />
                </Route>
                <Route exact path='/game'>
                    <GameMainComponent />
                </Route>
            </Switch>
        </Router>
    )
}
export default AppNavigation