import React from 'react';
import Helmet from 'react-helmet';

// Components
import Heading from 'Components/Heading';
import Blurb from 'Components/Blurb';

const About = () => (
  <div>
    <Helmet>
      <title>About</title>
      <meta name="description" content="This is the about page description" />
    </Helmet>
    <Heading>About</Heading>
    <Blurb />
  </div>
);

export default About;
