import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from "./Room";
import {Grid, Button, ButtonGroup, Typography} from '@material-ui/core'

import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link,
    Navigate,
} from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
    }

async componentDidMount() {
    const response = await fetch("/api/user-in-room");
    const data = await response.json();
    this.setState({
        roomCode: data.code
    });
}
/*
1. The switch has been replaced with Routes.
2. Components for routes are now passed through the element prop.
3. The exact prop is no longer needed as routes match exactly by default in v6.
*/
renderHomePage(){
    if(this.state.roomCode) {
        return(
          <Navigate to={`/room/${this.state.roomCode}`} replace={true} />
        )
      } else {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to='/join' component={Link}>
                        Join a Room
                    </Button>
                    <Button color="secondary" to='/create' component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        );
    }
}
     render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={this.renderHomePage()} />
                    <Route path="/join/*" element={<RoomJoinPage />} />
                    <Route path="/create/" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room />} render={({ match }) => <Room id={match.params.roomCode} />} />
                </Routes>
            </Router>
        )
    }
}
