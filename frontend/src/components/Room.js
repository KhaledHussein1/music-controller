import React, { useState, useEffect } from 'react';
import {Grid, Button, Typography} from '@material-ui/core' 
import { useParams, useNavigate } from 'react-router-dom';


export const Room = ({leaveRoomCallback}) => {
    const [VotesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate();

    const { roomCode } = useParams();

    useEffect(() => {
        getRoomDetails();
    }, [roomCode]);

    const getRoomDetails = () => {
        return fetch('/api/get-room' + '?code=' + roomCode)
        .then((response) => {
            if (!response.ok) {
                leaveRoomCallback();
                navigate("/");
            }
            return response.json()
        })
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
        })
        .catch((error) => {
            console.error('Error fetching room details:', error);
        });
    };
    
    const leaveButtonPressed = () => {
        const requestOptions = {
            method:"POST",
            headers: {"Content-Type": "application/json"},
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            leaveRoomCallback();
            navigate("/");
        });
    }

    return (
        <Grid container spacing ={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h6">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Votes: {VotesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick= {leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
};
export default Room;
