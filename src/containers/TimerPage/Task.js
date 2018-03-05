import React from 'react';
import { Grid, List, Collapse, IconButton } from 'material-ui';
import { ExpandLess, ExpandMore, PlayArrow }  from 'material-ui-icons';
import styled from 'styled-components';

import Clock from '../../components/Clock';
import Hour from '../../components/Hour';
import TaskExecution from './TaskExecution';
import StyledListItem from './StyledListItem';
import StyledInput from '../../components/StyledInput';
import {STATUS_RUNNING} from './constants';

const NumberButton = styled.button`
    && {
        border-color: transparent;
        background-color: hsla(97,36%,65%,.12);
        color: #4bc800;
    }
`;

const ExecutionListItem = StyledListItem.extend`
     &&:hover { 
         background-color: #F5F5F5;
     }
`;

const InputName = StyledInput.extend`
        font-size: 15px;
`;

export default ({task, setCurrentTask, changeTaskName, toggleExecutions, setExecutionToAdd, retryExecutionsTask, currentTask, setTaskToChangeName}) => {
    const severalExecutions = task.executions && task.executions.length > 1;
    const showExecutions = severalExecutions && task.showExecutions === true;
    return (
        <Grid container>
            <Grid container>
                <Grid item md={1}>
                    {severalExecutions
                    && <NumberButton onClick={() => toggleExecutions(task)}>
                        {task.executions.length}
                    </NumberButton>}
                </Grid>
                <Grid item md={7}>
                    {task.noPersisted === true && <button onClick={() => retryExecutionsTask(task, true) }>reintentar</button>}
                    <InputName
                        onChange={({target}) => {
                            changeTaskName(task, target.value);
                        }}
                        onBlur={() => {setTaskToChangeName(task);}}
                        value={task.name}
                    />
                </Grid>
                <Grid item md={1}>
                    <Hour momentObject={task.initialTime} /> - <Hour momentObject={task.finalTime} />
                </Grid>
                <Grid item md={1}>
                    <Clock seconds={task.seconds}/>
                </Grid>
                <Grid item md={1}>
                    <IconButton disabled={currentTask.status === STATUS_RUNNING} onClick={() => setCurrentTask(task)}>
                        <PlayArrow/>
                    </IconButton>
                </Grid>
                <Grid item md={1}>
                    { severalExecutions && (showExecutions ? <ExpandLess/> : <ExpandMore/>) }
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12}>
                    <Collapse in={showExecutions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            {task.executions && task.executions.map((execution, index) => (
                                <ExecutionListItem component="div" key={index}>
                                    <TaskExecution taskExecution={execution} setExecutionToAdd={setExecutionToAdd} />
                                </ExecutionListItem>
                            ))}
                        </List>
                    </Collapse>
                </Grid>
            </Grid>
        </Grid>
    );
};
