import React from 'react';
import {render} from 'react-dom';
import PeopleGraphContainer from './people-graph-container';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <PeopleGraphContainer />
  , div);
});