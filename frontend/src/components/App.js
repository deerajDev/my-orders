import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PendingOrdersList from './items/PendingOrdersList'
import CreateItem from './items/CreateItem';

import PrivateRoute from './common/PrivateRoute';
import Profile from './accounts/Profile';
import Register from './accounts/Register'
import LoginOwner from './accounts/LoginOwner'
import LoginStaff from './accounts/LoginStaff'
import Logout from './accounts/Logout';

import Chat from './common/Chat'
import Notification from './common/Notification';
import Items from './items/Items'
import NavBar from './common/NavBar'

class App extends Component {
    componentDidMount = () => {
        window.scrollTo(0, 0)
    }


    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <NavBar />
                    <Notification />
                    <Chat />
                    <Switch>
                        <PrivateRoute exact path='/' component={Items} />
                        <PrivateRoute exact path='/orders' component={PendingOrdersList} />
                        <PrivateRoute exact path='/create-item' component={CreateItem} />
                        <PrivateRoute exact path='/logout' component={Logout} />
                        <Route exact path='/profile'><Profile /></Route>
                        <Route exact path='/register'><Register /></Route>
                        <Route exact path='/login/owner'><LoginOwner /></Route>
                        <Route exact path='/login/staff'><LoginStaff /></Route>

                    </Switch>
                </Router>
            </MuiThemeProvider>

        )
    }
}


export default App
