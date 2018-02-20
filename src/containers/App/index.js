import React, {Component} from 'react';
import { compose } from 'redux';
import {PropTypes} from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Header from '../../common/Header';
import Login from '../Login';
import Timer from '../TimerPage';
import {getUser} from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import reducer from './reducer';

class App extends Component {

    render() {
        const {user} = this.props;
        return (
            <div>
                <Header/>
                <div>
                    <Switch>
                        {user && <Route path="/" component={Login} exact/>}
                        {user && <Route path="/timer" render={() => <Redirect to="/"/>}/>}
                        {!user && <Route path="/" component={Timer}/>}
                    </Switch>
                </div>
            </div>
        );
    }
};

const mapStateToProps = createStructuredSelector({
    user: getUser()
});

const withConnect = connect(mapStateToProps, {});

const withReducer = injectReducer({ key: 'global', reducer });

export default compose(
    withReducer,
    withConnect,
)(App);

