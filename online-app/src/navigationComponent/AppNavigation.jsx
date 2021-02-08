import React from 'react'
import {  
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useLocation,
    withRouter 
} from 'react-router-dom'
import HomeComponent from '../homeComponents/HomeComponent'
import GameMainComponent from '../gameComponents/GameMainScript'
import GameMainFieldComponent from '../gameComponents/gameMainField/GameMainFieldComponent'
import NotFoundComponent from '../notFoundComponent/NotFoundComponent'

import GameRankComponent from '../gameRankComponent/GameRankComponent'
import NavbarComponent from './NavbarComponent'
import GameRoomComponent from '../gameRoomComomponents/GameRoomComponent'

/*
{
    props.location.pathname != '/game' ?  <NavbarComponent /> : ''
            }

*/
const AppNavigation = withRouter( props => {
    //console.log(props)
    return(
        <Router>
            <NavbarComponent />
            <Switch>
                <Route exact path='/'>
                    <HomeComponent />
                </Route>
                <Route exact path='/game'>
                    <GameMainComponent />
                </Route>
                <Route exact path='/game/:id'>
                    <GameMainFieldComponent />
                </Route>
                <Route exact path='/game-rank'>
                    <GameRankComponent />
                </Route>
                <Route exact path='/game-rooms'>
                    <GameRoomComponent />
                </Route>
                <Route exact path='*'>
                    <NotFoundComponent />
                </Route>
            </Switch>
        </Router>
    )
})
export default AppNavigation