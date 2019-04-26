import React from 'react';
import Helmet from 'react-helmet';

import Heading from 'Components/Heading';

const Search = () => (
  <div>
    <Helmet>
      <title>Search</title>
      <meta name="description" content="This is the search page description" />
    </Helmet>
    <Heading>Search</Heading>
  </div>
);

export default Search;
