import React from 'react';
import { shallow } from 'enzyme';
import Heading from '.';

test('Heading testy McTest face', () => {
  const heading = shallow(<Heading>Banana</Heading>);

  expect(heading.text()).toEqual('Banana');
});
