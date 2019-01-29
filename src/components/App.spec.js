import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

beforeEach(() => {
  jest.resetModules();
  process.env.NODE_ENV = 'staging';
});

it('renders App without crashing', () => {
  shallow(<App />);
});
