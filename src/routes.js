import React from 'react';
import {Route, IndexRedirect, Redirect} from 'react-router';
import Layout from './components/layout.js';

import PeopleContainer from './components/people/graph/people-graph-container';
import ConnectionsContainer from './components/connections/graph/connections-graph-container';

function onRouteChange() {
    window.scrollTo(0, 0);
}

export default (
    <Route path="/" component={Layout} onChange={onRouteChange}>
        <IndexRedirect to="people" />
        <Route path="connections/:id" component={ConnectionsContainer} />
        <Route path="people" component={PeopleContainer} />
        <Redirect from="*" to="people" />
    </Route>
);