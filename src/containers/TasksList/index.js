import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

import {createStructuredSelector} from 'reselect';
import { getTasks } from './selectors';
import Task from '../Task';
import { getDayByTimesptamp } from '../../utils/utilities';
import { setCurrentTask } from '../CurrentTask/actions';


class TasksList extends Component {

    render() {
        return (
            <Grid style={{marginTop: '50px'}} container>
                <Grid container>
                    <Grid md={8} item>
                        <Grid container>
                            <Grid xs={12} item>
                                {this.props.tasks && this.props.tasks.length > 0
                                    ? getDayByTimesptamp(this.props.tasks[0].initialTime)
                                    : ''}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{marginTop: '30px'}} container>
                    {this.props.tasks.map((task, index) =>
                        (<Task
                            key={index}
                            task={task}
                            updateTask={() => this.props.setCurrentTask(task)}
                        />))}
                </Grid>
        </Grid>);
    }
}

// TasksList.propTypes = {
// };
//
const mapStateToProps = createStructuredSelector({
    tasks: getTasks()
});
//
// const mapDispatchToProps = {
//     setCurrentTask
// };
//
export default connect(
    mapStateToProps, {})(TasksList);
