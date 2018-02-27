import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Header from '../../common/Header';
import Login from '../Login';
import Timer from '../TimerPage';
import Modal from '../../components/Modal';
import {getUser, getModalOptions} from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import reducer from './reducer';
import {hideModal} from './actions';

class App extends Component {

    render() {
        const {user, modalOptions} = this.props;
        return (
            <div>
                <Header/>
                <Modal {...modalOptions} hideModal={hideModal} />
                <div>
                    <Switch>
                        {!user && <Route exact path="/timer" render={() => (<Redirect to="/"/>)}/>}
                        {!user && <Route exact path="/" component={Login}/>}
                        {user && <Route exact path="/" render={() => (<Redirect to="/timer"/>)}/>}
                        {user && <Route path="/timer" component={Timer}/>}
                    </Switch>
                </div>
            </div>
        );
    }
};

const mapStateToProps = createStructuredSelector({
    user: getUser(),
    modalOptions: getModalOptions()
});

const withConnect = connect(mapStateToProps, {hideModal});

const withReducer = injectReducer({key: 'global', reducer});

export default withRouter(compose(
    withReducer,
    withConnect,
)(App));

