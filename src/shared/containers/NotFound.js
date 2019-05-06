import React from 'react';
import Helmet from 'react-helmet';

import Heading from 'Components/Heading';

const NotFound = () => (
  <div>
    <Helmet>
      <title>Not found</title>
      <meta name="description" content="This is the 404 page description" />
    </Helmet>
    <Heading>Not found</Heading>
  </div>
);

export default NotFound;
