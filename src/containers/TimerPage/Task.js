import React from 'react';
import { Grid, List, ListItem, ListItemText, ListItemIcon, Collapse } from 'material-ui';
import { ExpandLess, ExpandMore, StarBorder }  from 'material-ui-icons';
import styled from 'styled-components';
import Clock from '../../components/Clock';
import Hour from '../../components/Hour';

import TaskExecution from './TaskExecution';
import StyledListItem from './StyledListItem';

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

export default ({task, updateTask, toggleExecutions}) => {
    const severalExecutions = task.executions.length > 1;
    const showExecutions = severalExecutions && task.showExecutions === true;
    return (
        <Grid container>
            <Grid container>
                <Grid item md={1} style={{textAlign: 'center'}}>
                    {severalExecutions
                    && <NumberButton onClick={toggleExecutions}>
                        {task.executions.length}
                    </NumberButton>}
                </Grid>
                <Grid item md={7}>
                    {task.name}
                </Grid>
                <Grid item md={1}>
                    <Hour timestamp={task.initialTime} /> - <Hour timestamp={task.finalTime} />
                </Grid>
                <Grid item md={1}>
                    <Clock seconds={task.seconds}/>
                </Grid>
                <Grid item md={1}>
                    <img onClick={updateTask} src="/img/playexecution.png"/>
                </Grid>
                <Grid item md={1}>
                    { severalExecutions && (showExecutions ? <ExpandLess/> : <ExpandMore/>) }
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12}>
                    <Collapse in={showExecutions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            {task.executions.map((execution, index) => (
                                <ExecutionListItem component="div" key={index}>
                                    <TaskExecution taskExecution={execution} />
                                </ExecutionListItem>
                            ))}
                        </List>
                    </Collapse>
                </Grid>
            </Grid>
        </Grid>
    );
};
