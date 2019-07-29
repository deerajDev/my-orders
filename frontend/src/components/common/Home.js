import React, { Component } from 'react'
import Chat from './Chat'
import Items from '../items/Items'
import NavBar from './NavBar'

class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Items />
                <Chat />
            </React.Fragment>
        );
    }
}

export default Home