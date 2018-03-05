import React from 'react';
import { Grid, IconButton } from 'material-ui';
import styled from 'styled-components';
import { PlayCircleFilled, Pause }  from 'material-ui-icons';

import Clock from '../../components/Clock';
import CustomGrid from '../../components/CustomGrid';
import TimerButton from './TimerButton';
import { STATUS_RUNNING, STATUS_STOPPED } from './constants';
import StyledInput from '../../components/StyledInput';

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

const InputName = StyledInput.extend`
        font-size: 20px;
        width: 100%;
`;

export default ({ currentTask, initTime, changeCurrentTaskName, setCurrentTask, stopTime }) => {

    return (
        <StyledGrid container>
            <Grid md={10} item>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentTask(currentTask);
                }}>
                    <InputName
                        placeholder="What are you working on?"
                        value={currentTask.name}
                        onChange={({target}) => changeCurrentTaskName(target.value)}
                    />
                </form>
            </Grid>
            <Grid md={2} item>
                <Grid container justify="flex-end" alignItems="center">
                    <Grid item>
                        <StyledClock seconds={currentTask.seconds}/>
                    </Grid>
                    <Grid item>
                        {currentTask.status === STATUS_STOPPED && <IconButton green500 primary
                            onClick={() => setCurrentTask(currentTask)}><PlayCircleFilled green500/></IconButton>}
                        {currentTask.status === STATUS_RUNNING && <IconButton onClick={() => stopTime()}><Pause/></IconButton>}
                    </Grid>
                </Grid>
            </Grid>
        </StyledGrid>
    );
};
