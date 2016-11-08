import React from 'react';
import {render} from 'react-dom';
import PeopleSubHeader from './people-subheader';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <PeopleSubHeader />
  , div);
});