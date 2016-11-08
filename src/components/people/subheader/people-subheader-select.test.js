import React from 'react';
import {render} from 'react-dom';
import PeopleSubHeaderSelect from './people-subheader-select';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <PeopleSubHeaderSelect />
  , div);
});