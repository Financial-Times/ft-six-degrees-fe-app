import React from 'react';
import {render} from 'react-dom';
import Layout from './layout';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    children = React.createElement('div'),
    noop = () => {
      return;
    },
    store = {
        dispatch: noop,
        getState: noop,
        subscribe: noop
    };
  render(<Layout store={store} children={children} />, div);
});
