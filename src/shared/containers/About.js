import React from 'react';
import Helmet from 'react-helmet';

import Heading from 'Components/Heading';

const About = () => (
  <div>
    <Helmet>
      <title>About</title>
      <meta name="description" content="This is the about page description" />
    </Helmet>
    <Heading>About</Heading>
  </div>
);

export default About;
