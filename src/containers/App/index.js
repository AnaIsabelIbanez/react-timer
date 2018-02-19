import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';

import Header from '../../common/Header';
import Login from '../Login';
import Timer from '../TimerPage';
import {createStructuredSelector} from "reselect";
import {getUser} from "./selectors";
import {connect} from "react-redux";

class App extends Component {

    render() {
        const {user} = this.props;
        return (
            <div className="container-fluid text-center">
                <Header/>
                <div>
                    <Switch>
                        {!user && <Route path="/" component={Login} exact/>}
                        {!user && <Route path="/timer" render={() => <Redirect to="/"/>}/>}
                        {user && <Route path="/" component={Timer}/>}
                    </Switch>
                </div>
            </div>
        );
    }
};

const mapStateToProps = createStructuredSelector({
    user: getUser()
});

export default connect(mapStateToProps, {})(App);

