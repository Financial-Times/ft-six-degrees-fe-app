import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import PeopleSubHeaderGroup from './people-subheader-group';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore();

  render(
    <PeopleSubHeaderGroup store={store} />
  , div);
});