import React from 'react';
import Grid from 'material-ui/Grid';

import Clock from '../../components/Clock';
import Hour from '../../components/Hour';

export default ({taskExecution}) => {
    return (
        <Grid container style={{height: '150', margin: 'auto'}}>
            <Grid item md={1}/>
            <Grid item md={7}>{taskExecution.name}</Grid>
            <Grid item md={1}>
                <Hour momentObject={taskExecution.initialTime} /> - <Hour momentObject={taskExecution.finalTime} />
            </Grid>
            <Grid item md={1}>
                <Clock seconds={taskExecution.seconds}/>
            </Grid>
            <Grid item md={2}/>
        </Grid>
    );
};
