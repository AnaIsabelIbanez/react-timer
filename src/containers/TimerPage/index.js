import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import styled from 'styled-components';

import TasksList from './TasksList';
import CurrentTask from './CurrentTask';
import CustomGrid from '../../components/CustomGrid';
import {
    initTime,
    incrementTime,
    reset,
    setCurrentTask,
    stopTime,
    changeCurrentTaskName,
    toggleExecutions,
    toggleAllExecutions,
    changeVisibleDay,
    changeTaskName
} from './actions';
import {getTasks, getCurrentTask} from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducer';
import saga from './saga/rootSagas';

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

    componentWillMount() {
        this.props.changeVisibleDay(0);
    }

    render() {
        const {
            tasks,
            currentTask,
            setCurrentTask,
            initTime,
            stopTime,
            changeCurrentTaskName,
            toggleExecutions,
            toggleAllExecutions,
            changeVisibleDay,
            changeTaskName
        } = this.props;

        return (
            <StyledGrid container>
                <CurrentTask
                    currentTask={currentTask}
                    initTime={initTime}
                    setCurrentTask={setCurrentTask}
                    stopTime={stopTime}
                    changeCurrentTaskName={changeCurrentTaskName}
                />
                {tasks.length > 0 && <ListContainer container>
                    <TasksList
                        tasks={tasks}
                        setCurrentTask={setCurrentTask}
                        toggleExecutions={toggleExecutions}
                        toggleAllExecutions={toggleAllExecutions}
                        changeVisibleDay={changeVisibleDay}
                        changeTaskName={changeTaskName}
                    />
                </ListContainer>}
            </StyledGrid>
        );
    }
};

TimerPage.propTypes = {};

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
    changeCurrentTaskName,
    toggleExecutions,
    toggleAllExecutions,
    changeVisibleDay,
    changeTaskName
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'timer', reducer});
const withSaga = injectSaga({key: 'timer', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(TimerPage);
