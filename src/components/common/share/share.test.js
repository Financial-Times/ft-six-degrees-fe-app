import React from 'react';
import {render} from 'react-dom';
import Share from './share';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <Share />
  , div);
});