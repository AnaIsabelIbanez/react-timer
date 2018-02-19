import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Timer from './containers/TimerPage';

// Map components to different routes.
// The parent component wraps other components and thus serves as  the entrance to
// other React components.
// IndexRoute maps HomePage component to the default route
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="timer" component={Timer} />
    </Route>
);
