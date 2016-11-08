import React from 'react';
import {render} from 'react-dom';
import SubHeader from './subheader';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    location = 'xyz';

  render(
    <SubHeader location={location} />
  , div);
});