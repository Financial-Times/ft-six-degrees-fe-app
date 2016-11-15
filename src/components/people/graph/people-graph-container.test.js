import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import PeopleGraphContainer from './people-graph-container';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore();

  render(
    <PeopleGraphContainer store={store} />
  , div);
});