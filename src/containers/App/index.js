import React, {Component} from 'react';
import { compose } from 'redux';
import {PropTypes} from 'prop-types';
import { withRouter } from 'react-router';
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
                        {!user && <Route exact path="/timer" render={() => (<Redirect to="/"/>)}/>}
                        {!user && <Route path="/" component={Login} exact/>}
                        <Route path="/timer" component={Timer}/>
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

export default withRouter(compose(
    withReducer,
    withConnect,
)(App));

