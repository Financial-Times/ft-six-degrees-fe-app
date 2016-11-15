import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import Header from './header';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore();

  render(
    <Header store={store} />
  , div);
});