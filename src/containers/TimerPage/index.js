import React, { Component } from 'react';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import styled from 'styled-components';

import TasksList from './TasksList';
import CurrentTask from './CurrentTask';
import CustomGrid from '../../components/CustomGrid';
import { initTime, incrementTime, reset, setCurrentTask, stopTime, changeTaskName, toggleExecutions} from './actions';
import {getTasks, getCurrentTask} from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducer';
import saga from './saga';

const StyledGrid = styled(CustomGrid)`
    && {
        padding: 20px;
    }
`;

const ListContainer = styled(CustomGrid)`
    && {
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1);
        padding: 2em;
    }
`;

class TimerPage extends Component {

    render() {
        const { tasks, currentTask, setCurrentTask, initTime, stopTime, changeTaskName, toggleExecutions} = this.props;
        return (
            <StyledGrid container>
                <CurrentTask
                    currentTask={currentTask}
                    initTime={initTime}
                    setCurrentTask={setCurrentTask}
                    stopTime={stopTime}
                    changeTaskName={changeTaskName}
                />
                {tasks.length >  0 && <ListContainer container>
                    <TasksList
                        tasks={tasks}
                        setCurrentTask={setCurrentTask}
                        toggleExecutions={toggleExecutions}
                    />
                </ListContainer>}
            </StyledGrid>
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
    changeTaskName,
    toggleExecutions
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'timer', reducer });
const withSaga = injectSaga({ key: 'timer', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(TimerPage);
