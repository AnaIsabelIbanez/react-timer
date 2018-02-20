import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Grid, Button, TextField} from 'material-ui';

import { changeUsername, changePassword, doLogin } from './actions';
import { getUsername, getPassword } from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducer';
import saga from './saga';


class Login extends Component {

    doLogin = ev => {
        const { username, password } = this.props;
        ev.preventDefault();
        this.props.doLogin({username, password});
    };

    render() {
        return (
            <form onSubmit={this.doLogin} >
                <Grid container justify="center">
                    <Grid md={6} item>
                        <Grid container>
                            <Grid md={12} item>
                                <TextField
                                    type="text"
                                    placeholder="User"
                                    error={false}
                                    helperText="Required field"
                                    label="User"
                                    value={this.props.username}
                                    onChange={({target}) => this.props.changeUsername(target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid md={12} item>
                                <TextField
                                    placeholder="Password"
                                    type="password"
                                    error={false}
                                    helperText="Required field"
                                    id="password"
                                    label="Password"
                                    value={this.props.password}
                                    onChange={({target}) => this.props.changePassword(target.value)}
                                    fullWidth
                                />
                            </Grid>

                            <Grid xs={12} item>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

Login.propTypes = {
};

const mapStateToProps = createStructuredSelector({
    username: getUsername(),
    password: getPassword()
});

const mapDispatchToProps = {
    changeUsername,
    changePassword,
    doLogin
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Login);
