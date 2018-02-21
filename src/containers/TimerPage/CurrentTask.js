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
        font-size: 20px;
    `;

const StyledInput = styled.input`
        border: 0;
        font-size: 20px;
        width: 100%;
        padding-top: 15px;
`;

export default ({ currentTask, initTime, changeTaskName, setCurrentTask, stopTime }) => {

    return (
        <StyledGrid container>
            <Grid md={10} item>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentTask(currentTask);
                }}>
                    <StyledInput
                        placeholder="What are you working on?"
                        value={currentTask.name}
                        onChange={({target}) => changeTaskName(target.value)}
                    />
                </form>
            </Grid>
            <Grid md={2} item>
                <Grid container justify="flex-end" alignItems="center">
                    <Grid item>
                        <StyledClock seconds={currentTask.seconds}/>
                    </Grid>
                    <Grid item>
                        {currentTask.status === STATUS_STOPPED && <TimerButton onClick={() => setCurrentTask(currentTask)}/>}
                        {currentTask.status === STATUS_RUNNING && <TimerButton pause onClick={() => stopTime()}/>}
                    </Grid>
                </Grid>
            </Grid>
        </StyledGrid>
    );
};
