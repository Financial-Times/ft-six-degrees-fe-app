import React from 'react';
import {render} from 'react-dom';
import ShareBtn from './share-button';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    href = 'xyz',
    icon = 'abc';

  render(
    <ShareBtn href={href} icon={icon} />
  , div);
});