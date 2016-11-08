import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import PeopleSubHeaderDateRange from './people-subheader-date-range';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore();

  render(
    <PeopleSubHeaderDateRange store={store} />
  , div);
});