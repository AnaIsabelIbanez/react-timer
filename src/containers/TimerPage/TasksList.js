import React from 'react';
import { Grid, List, IconButton } from 'material-ui';
import { KeyboardArrowLeft, KeyboardArrowRight }  from 'material-ui-icons';
import LoadingIndicator from '../../components/LoadingIndicator';

import Task from './Task';
import {getCalendarDay, getMomentByIsoString} from '../../utils/utilities';
import StyledListItem from './StyledListItem';

export default ({ tasks, setCurrentTask, toggleExecutions, toggleAllExecutions, changeVisibleDay, changeTaskName, showSpinner, setExecutionToAdd, visibleDay, retryExecutionsTask, currentTask, setTaskToChangeName }) => {
    const taskDay = getCalendarDay(visibleDay);
    return (
        <Grid container>
            {tasks.length > 0
            &&
            <List component="nav">
                <Grid container>
                    <Grid md={1} item>
                        <Grid container justify="center" alignItems="center">
                            <IconButton onClick={() => changeVisibleDay(-1)}>
                                <KeyboardArrowLeft/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    {showSpinner && <LoadingIndicator/> }
                    {!showSpinner && <Grid md={10} item>
                        <Grid container>
                            <Grid md={6} item>
                                <h3>{taskDay}</h3>
                            </Grid>
                            <Grid md={6} item>
                                <button
                                    onClick={toggleAllExecutions}
                                >
                                    Show all
                                </button>
                            </Grid>
                        </Grid>
                        {tasks.filter((task1) => {
                            return getCalendarDay(task1.initialTime) === getCalendarDay(visibleDay);
                        }).map((task, index) =>
                            (
                                <StyledListItem component="div" key={index}>
                                    <Task
                                        task={task}
                                        setCurrentTask={setCurrentTask}
                                        toggleExecutions={toggleExecutions}
                                        changeTaskName={changeTaskName}
                                        setExecutionToAdd={setExecutionToAdd}
                                        retryExecutionsTask={retryExecutionsTask}
                                        currentTask={currentTask}
                                        setTaskToChangeName={setTaskToChangeName}
                                    />
                                </StyledListItem>
                            ))
                        }
                    </Grid>}
                    <Grid md={1} item >
                        <Grid container justify="center" alignItems="center">
                            <IconButton onClick={() => changeVisibleDay(1)}>
                                <KeyboardArrowRight/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </List>

            }
        </Grid>
    );
};
