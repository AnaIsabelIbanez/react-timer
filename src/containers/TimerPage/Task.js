import React from 'react';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';

import TaskExecution from './TaskExecution';
import CustomGrid from '../../components/CustomGrid';

const NumberButton = styled.button`
    && {
        border-color: transparent;
        background-color: hsla(97,36%,65%,.12);
        color: #4bc800;
    }
`;

export default ({task, updateTask, toggleExecutions}) => {
    const severalExecutions = task.executions.length > 1;
    const showExecutions = severalExecutions && task.showExecutions === true;
    return (
        <Grid md={12} item>
            <Grid container>
                <Grid md={1} item>
                    {severalExecutions && <NumberButton
                        onClick={toggleExecutions}
                    >
                        {task.executions.length}
                    </NumberButton>}
                </Grid>
                <Grid md={9} item>
                    <TaskExecution
                        taskExecution={task}
                    />
                </Grid>
                <Grid md={2} item>
                    <button
                        onClick={updateTask}
                    >
                        play
                    </button>
                </Grid>
            </Grid>
            {showExecutions && task.executions.map((execution, index) => (
                <Grid container key={index}>
                    <Grid md={1} item>
                        {severalExecutions && <NumberButton
                            onClick={toggleExecutions}
                        >
                            {task.executions.length}
                        </NumberButton>}
                    </Grid>
                    <TaskExecution
                        key={index}
                        taskExecution={execution}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
