import React from 'react';
import ReactDOM from 'react-dom';
import Manage from './Manage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Manage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
