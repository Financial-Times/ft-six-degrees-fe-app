import React from 'react';
import {render} from 'react-dom';
import configureStore from '../../../store/configure-store';
import ConnectionsSubHeader from './connections-subheader';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    store = configureStore()

  render(
    <ConnectionsSubHeader store={store} />
  , div);
});