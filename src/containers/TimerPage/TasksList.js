import React from 'react';
import {Grid, List, ListItem, ListSubheader} from 'material-ui';

import Task from './Task';
import { getDayByTimesptamp } from '../../utils/utilities';
import StyledListItem from './StyledListItem';

export default ({ tasks, setCurrentTask, toggleExecutions }) => {
    return (
        <Grid container>
            {tasks.length > 0
            &&
            <List component="nav"
                  subheader={<ListSubheader component="div">
                      {tasks && tasks.length > 0
                          ? <h3>{getDayByTimesptamp(tasks[0].initialTime)}</h3>
                          : ''}
                  </ListSubheader>}>
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
