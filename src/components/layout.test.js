import React from 'react';
import {render} from 'react-dom';
import Layout from './layout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Layout />, div);
});
