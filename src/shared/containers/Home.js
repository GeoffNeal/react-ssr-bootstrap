import React from 'react';
import Helmet from 'react-helmet';

// Components
import Heading from 'Components/Heading';
import Blurb from 'Components/Blurb';

const Home = () => (
  <div>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="This is the home page description" />
    </Helmet>
    <Heading>Home</Heading>
    <Blurb />
  </div>
);

export default Home;
