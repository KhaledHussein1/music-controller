import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
} from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
/*
1. The switch has been replaced with Routes.
2. Components for routes are now passed through the element prop.
3. The exact prop is no longer needed as routes match exactly by default in v6.
*/
    render () {
        return (
        <Router>
            <Routes> 
                <Route path="/" element={<p>This is the home page</p>}/>
                <Route path="/join" element={<RoomJoinPage/>} />
                <Route path="/create" element={<CreateRoomPage/>} />
            </Routes>
        </Router>
        );
    }
}
