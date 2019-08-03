import React from 'react';
import ReactDOM from 'react-dom';
import PayoutSettings from './PayoutSettings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PayoutSettings />, div);
  ReactDOM.unmountComponentAtNode(div);
});
