import React from 'react';
import { Grid, List } from 'material-ui';

import Task from './Task';
import { getDayByTimesptamp } from '../../utils/utilities';
import StyledListItem from './StyledListItem';

export default ({ tasks, setCurrentTask, toggleExecutions, toggleAllExecutions }) => {
    return (
        <Grid container>
            {tasks.length > 0
            &&
            <List component="nav">
                <Grid container>
                    <Grid md={6} item>
                        <h3>{getDayByTimesptamp(tasks[0].initialTime)}</h3>
                    </Grid>
                    <Grid md={6} item>
                        <button
                            onClick={toggleAllExecutions}
                        >
                            Show all
                        </button>
                    </Grid>
                </Grid>
                {tasks.map((task, index) =>
                    (
                        <StyledListItem component="div" key={index}>
                            <Task
                                task={task}
                                updateTask={() => setCurrentTask(task)}
                                toggleExecutions={() => toggleExecutions(task)}/>
                        </StyledListItem>
                    ))
                }
            </List>

            }
        </Grid>
    );
};
