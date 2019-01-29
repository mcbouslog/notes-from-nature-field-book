import React from 'react';
import { shallow } from 'enzyme';
import Title from './Title';

it('renders Title without crashing', () => {
  shallow(<Title>Test</Title>);
});
