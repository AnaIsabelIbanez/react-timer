import React from 'react';
import Grid from 'material-ui/Grid';

import Clock from '../../components/Clock';
import Hour from '../../components/Hour';

export default ({taskExecution}) => {
    return (
        <Grid container>
            <Grid item md={1}/>
            <Grid item md={7}>{taskExecution.name}</Grid>
            <Grid item md={1}>
                <Hour timestamp={taskExecution.initialTime} /> - <Hour timestamp={taskExecution.finalTime} />
            </Grid>
            <Grid item md={1}>
                <Clock seconds={taskExecution.seconds}/>
            </Grid>
            <Grid item md={2}/>
        </Grid>
    );
};
