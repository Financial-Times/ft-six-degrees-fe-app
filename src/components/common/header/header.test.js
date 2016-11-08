import React from 'react';
import {render} from 'react-dom';
import Header from './header';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(
    <Header />
  , div);
});