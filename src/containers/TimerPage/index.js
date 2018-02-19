import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import TasksList from './TasksList';
import CurrentTask from './CurrentTask';
import { initTime, incrementTime, reset, setCurrentTask, stopTime, changeTaskName} from './actions';
import {getTasks, getCurrentTask} from './selectors';

class TimerPage extends Component {

    render() {
        const { tasks, currentTask, setCurrentTask, initTime, stopTime, changeTaskName} = this.props;
        return (
            <Grid container>
                <CurrentTask
                    currentTask={currentTask}
                    initTime={initTime}
                    setCurrentTask={setCurrentTask}
                    stopTime={stopTime}
                    setCurrentTask={setCurrentTask}
                    changeTaskName={changeTaskName}
                />
                <Grid container item>
                    <TasksList
                        tasks={tasks}
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
    currentTask: getCurrentTask(),
    tasks: getTasks()
});

const mapDispatchToProps = {
    setCurrentTask,
    initTime,
    incrementTime,
    reset,
    stopTime,
    changeTaskName
};

export default connect(
    mapStateToProps, mapDispatchToProps)(TimerPage);
