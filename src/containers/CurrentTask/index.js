import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField } from 'material-ui';
import { createStructuredSelector } from 'reselect';

import Clock from '../../components/Clock';
import { getCurrentTask } from './selectors';
import TimerButton from './TimerButton';
import { changeTaskName } from './actions';


class CurrentTask extends Component {

    render() {
        const { currentTask, initTime, incrementTime, reset } = this.props;
        return (
                <Grid container>
                    <Grid md={8} item>
                        <Grid spacing={24} container>
                            <Grid xs={12} item>
                                <form onSubmit={this.props.initTime} >
                                    <TextField
                                        placeholder="What are you working on?"
                                        error={false}
                                        helperText="Required field"
                                        value={this.props.currentTask.name}
                                        onChange={({target}) => this.props.changeTaskName(target.value)}
                                        fullWidth
                                    />
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid md={4} item>
                        <Grid spacing={24} container>
                            <Grid xs={12} item>
                                <Clock seconds={currentTask.seconds}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid md={4} item>
                        <Grid spacing={24} container>
                            <Grid xs={12} item>
                                <TimerButton onClick={() => this.props.setCurrentTask(this.props.currentTask)}>Play</TimerButton>
                                <TimerButton onClick={this.props.stopTime}>Cancel</TimerButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        );
    }
}

CurrentTask.propTypes = {
};

// const mapStateToProps = createStructuredSelector({
//     currentTask: getCurrentTask()
// });

const mapDispatchToProps = {
    changeTaskName
};

export default connect(
    null, mapDispatchToProps)(CurrentTask);
