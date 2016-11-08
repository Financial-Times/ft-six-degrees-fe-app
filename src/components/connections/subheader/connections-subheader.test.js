import React from 'react';
import {render} from 'react-dom';
import ConnectionsSubHeader from './connections-subheader';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <ConnectionsSubHeader />
  , div);
});