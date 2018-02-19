import React from 'react';
import Grid from 'material-ui/Grid';

import Clock from '../../components/Clock';
import Hour from '../../components/Hour';

export default ({taskExecution, updateTask}) => {
    return (
        <Grid style={{margin: '30px'}} container>
            <Grid  md={4} item>
                {taskExecution.name}
            </Grid>
            <Grid md={3} item>
                <Hour timestamp={taskExecution.initialTime} /> - <Hour timestamp={taskExecution.finalTime} />
            </Grid>
            <Grid md={3} item>
                <Clock seconds={taskExecution.seconds}/>
            </Grid>
            <Grid md={2} item>
                <Grid container>
                    <Grid xs={12} item>
                        <button
                            onClick={updateTask}
                        >
                            play
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
)};
