import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core"


const CreateRoomPage = ( { update, roomCode } ) => {
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === 'true');
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
          }),
        };
    
        fetch('/api/create-room', requestOptions)
          .then((response) => response.json())
          .then((data) => navigate('/room/' + data.code))
          .catch((error) => {
            console.error('Error creating room:', error);
          });
      };

      const handleUpdateButtonPressed = () => {
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
            code: roomCode,
          }),
        };
    
        fetch('/api/update-room', requestOptions)
          .then((response) => {
            if (response.ok) {
              setSuccessMsg("Room updated successfully!");
            } else {
              setErrorMsg("Error updating room...");
              }
          })
      };

      const renderCreateButtons = () => {
        return(<Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={handleRoomButtonPressed}
            >
              Create A Room
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to="/"
              >
              Back
            </Button>
          </Grid>
          </Grid>
          );
      }

      const renderUpdateButtons = () => {
        return(
        <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdateButtonPressed}
            >
              Update Room
            </Button>
          </Grid>
          );
      }

      const title = update ? "Update Room" : "Create a Room"

      return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Collapse in={errorMsg != "" || successMsg != ""}>
              {successMsg}
            </Collapse>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">Guest Control of Playback State</div>
              </FormHelperText>
              <RadioGroup
                row
                defaultValue="true"
                onChange={handleGuestCanPauseChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" />}
                  label="Play/Pause"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="secondary" />}
                  label="No Control"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <TextField
                required={true}
                type="number"
                onChange={handleVotesChange}
                defaultValue={votesToSkip}
                inputProps={{
                  min: 1,
                  style: { textAlign: "center" },
                }}
              />
              <FormHelperText>
                <div>Votes Required to Skip Song</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          { update ? renderUpdateButtons() : renderCreateButtons()}
        </Grid>
      );
    };
    
    export default CreateRoomPage;