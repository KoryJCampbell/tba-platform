import React from 'react';
import ReactDOM from 'react-dom';
import MyEvents from './MyEvents';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyEvents />, div);
  ReactDOM.unmountComponentAtNode(div);
});
