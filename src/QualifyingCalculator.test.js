import React from 'react';
import ReactDOM from 'react-dom';
import QualifyingCalculator from './QualifyingCalculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QualifyingCalculator />, div);
});
