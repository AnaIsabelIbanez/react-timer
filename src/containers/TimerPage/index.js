import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import TasksList from '../TasksList';
import CurrentTask from '../CurrentTask';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {addTask, initTime, incrementTime, reset, setCurrentTask, stopTime} from './actions';
import {getTasks} from './selectors';
import {getCurrentTask} from '../CurrentTask/selectors';

class TimerPage extends Component {

    render() {
        const { currentTask, addTask, setCurrentTask, initTime, incrementTime, reset, stopTime} = this.props;
        return (
            <Grid container>
                <CurrentTask
                    currentTask={currentTask}
                    initTime={initTime}
                    incrementTime={incrementTime}
                    reset={reset}
                    setCurrentTask={setCurrentTask}
                    stopTime={stopTime}
                />
                <Grid container item>
                    <TasksList
                        setCurrentTask={setCurrentTask}
                    />
                </Grid>
            </Grid>
        );
    }
};

TimerPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
    currentTask: getCurrentTask()
});

const mapDispatchToProps = {
    addTask,
    setCurrentTask,
    initTime,
    incrementTime,
    reset,
    stopTime
};

export default connect(
    mapStateToProps, mapDispatchToProps)(TimerPage);
