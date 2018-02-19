import React from 'react';
import Grid from 'material-ui/Grid';

import TaskExecution from './TimerPage/TaskExecution';

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showExecutions: false
        };
    };

    render() {
        const { task, updateTask } = this.props;
        const severalExecutions = task.executions.length > 1;
        const showExecutions = severalExecutions && this.state.showExecutions === true;
        return (
            <Grid style={{margin: '30px'}} container>
                <Grid md={1} item>
                    {severalExecutions && <button
                        onClick={() => this.setState({ showExecutions: !this.state.showExecutions })}
                    >
                        {task.executions.length}
                    </button>}
                </Grid>
                <TaskExecution
                    taskExecution={task}
                    updateTask={updateTask}
                />
                {showExecutions && task.executions.map((execution, index) => (
                    <TaskExecution
                        key={index}
                        taskExecution={execution}
                        updateTask={updateTask}
                    />
                ))}
            </Grid>
        );
    };
}
