import React, { Component } from 'react';
import { Grid, TextField } from 'material-ui';
import { createStructuredSelector } from 'reselect';

import Clock from '../../components/Clock';
import TimerButton from './TimerButton';

export default ({ currentTask, initTime, changeTaskName, setCurrentTask, stopTime }) => {
    return (
        <Grid container>
            <Grid md={8} item>
                <Grid spacing={24} container>
                    <Grid xs={12} item>
                        <form onSubmit={() => initTime()} >
                            <TextField
                                placeholder="What are you working on?"
                                error={false}
                                helperText="Required field"
                                value={currentTask.name}
                                onChange={({target}) => changeTaskName(target.value)}
                                fullWidth
                            />
                        </form>
                    </Grid>
                </Grid>
            </Grid>
            <Grid md={4} item>
                <Grid spacing={24} container>
                    <Grid xs={12} item>
                        <Clock seconds={currentTask.seconds}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid md={4} item>
                <Grid spacing={24} container>
                    <Grid xs={12} item>
                        <TimerButton onClick={() => setCurrentTask(currentTask)}>Play</TimerButton>
                        <TimerButton onClick={() => stopTime()}>Cancel</TimerButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
