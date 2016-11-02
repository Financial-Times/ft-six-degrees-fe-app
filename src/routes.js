import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/layout.js';
import HomePage from './components/pages/home/home-page';
import SubPage from './components/pages/example/sub-page';

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={HomePage} />
        <Route path="subpage" component={SubPage} />
    </Route>
);