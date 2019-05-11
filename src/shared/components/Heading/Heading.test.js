import React from 'react';
import { shallow } from 'enzyme';
import Heading from '.';

test('sanity test', () => {
  const heading = shallow(<Heading>Hello world</Heading>);

  expect(heading.text()).toEqual('Hello world');
});
