import React from 'react';
import {render} from 'react-dom';
import ConnectionsGraphContainer from './connections-graph-container';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <ConnectionsGraphContainer />
  , div);
});