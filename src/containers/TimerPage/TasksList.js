import React from 'react';
import Grid from 'material-ui/Grid';

import Task from '../Task';
import { getDayByTimesptamp } from '../../utils/utilities';


export default ({ tasks, setCurrentTask }) => {
    return (
        <Grid style={{marginTop: '50px'}} container>
            <Grid container>
                <Grid md={8} item>
                    <Grid container>
                        <Grid xs={12} item>
                            {tasks && tasks.length > 0
                                ? getDayByTimesptamp(tasks[0].initialTime)
                                : ''}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{marginTop: '30px'}} container>
                {tasks.map((task, index) =>
                    (<Task
                        key={index}
                        task={task}
                        updateTask={() => setCurrentTask(task)}
                    />))}
            </Grid>
        </Grid>
    );
};
