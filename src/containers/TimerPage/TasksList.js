import React from 'react';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';

import Task from './Task';
import { getDayByTimesptamp } from '../../utils/utilities';
import CustomGrid from '../../components/CustomGrid';

const StyledGrid = styled(CustomGrid)`
    && {
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1);
        padding: 2em; 
    }
`;

export default ({ tasks, setCurrentTask, toggleExecutions }) => {
    return (
        <Grid container>
            {tasks.length > 0 && <Grid container>
                    <Grid md={12} item>
                        <label>
                            {tasks && tasks.length > 0
                                ? getDayByTimesptamp(tasks[0].initialTime)
                                : ''}
                        </label>
                    </Grid>
                    {tasks.map((task, index) =>
                        (
                            <Grid container>
                                <Task
                                    key={index}
                                    task={task}
                                    updateTask={() => setCurrentTask(task)}
                                    toggleExecutions={() => toggleExecutions(task)}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            }
        </Grid>
    );
};
