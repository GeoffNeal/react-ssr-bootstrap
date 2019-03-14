import React from 'react';
import Helmet from 'react-helmet';

import Heading from 'Components/Heading';

const Home = () => (
  <div>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="This is the home page description" />
    </Helmet>
    <Heading>Home</Heading>
  </div>
);

export default Home;
