import React from 'react';
import { Grid, TextField } from 'material-ui';
import styled from 'styled-components';

import Clock from '../../components/Clock';
import CustomGrid from '../../components/CustomGrid';
import TimerButton from './TimerButton';
import { STATUS_RUNNING, STATUS_STOPPED } from './constants';

const StyledGrid = styled(CustomGrid)`
    && {
        height: 66px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
        margin-bottom: 50px;
        z-index: 100;
    }
`;
const StyledClock = styled(Clock)`
        text-align: center;
        color: #7b7b7b;
        white-space: nowrap;
        font-size: 15px;
    `;

export default ({ currentTask, initTime, changeTaskName, setCurrentTask, stopTime }) => {

    return (
        <StyledGrid container>
            <Grid md={8} item>
                <Grid spacing={24} container>
                    <Grid md={12} item>
                        <form onSubmit={() => initTime()}>
                            <TextField
                                placeholder="What are you working on?"
                                error={false}
                                value={currentTask.name}
                                onChange={({target}) => changeTaskName(target.value)}
                                fullWidth
                            />
                        </form>
                    </Grid>
                </Grid>
            </Grid>
            <Grid md={2} item>
                <Grid container>
                    <Grid md={12} item>
                        <StyledClock seconds={currentTask.seconds}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid md={2} item>
                <Grid spacing={24} container>
                    <Grid xs={12} item>
                        {currentTask.status === STATUS_STOPPED && <TimerButton onClick={() => setCurrentTask(currentTask)}>Play</TimerButton>}
                        {currentTask.status === STATUS_RUNNING && <TimerButton onClick={() => stopTime()}>Cancel</TimerButton>}
                    </Grid>
                </Grid>
            </Grid>
        </StyledGrid>
    );
};
