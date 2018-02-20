import React from 'react';
import Grid from 'material-ui/Grid';

import Clock from '../../components/Clock';
import Hour from '../../components/Hour';

export default ({taskExecution}) => {
    return (
        <Grid container>
            <Grid  md={4} item>
                {taskExecution.name}
            </Grid>
            <Grid md={3} item>
                <Hour timestamp={taskExecution.initialTime} /> - <Hour timestamp={taskExecution.finalTime} />
            </Grid>
            <Grid md={3} item>
                <Clock seconds={taskExecution.seconds}/>
            </Grid>
        </Grid>
    );
};
