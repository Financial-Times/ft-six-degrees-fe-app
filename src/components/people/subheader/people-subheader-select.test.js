import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import PeopleSubHeaderSelect from './people-subheader-select';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore();

  render(
    <PeopleSubHeaderSelect store={store} />
  , div);
});