import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import PeopleSubHeaderLoginArea from './people-subheader-login-area';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore();

  render(
    <PeopleSubHeaderLoginArea store={store}/>
  , div);
});