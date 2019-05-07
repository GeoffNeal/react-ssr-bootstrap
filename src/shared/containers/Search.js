import React from 'react';
import Helmet from 'react-helmet';

// Components
import Heading from 'Components/Heading';
import Blurb from 'Components/Blurb';

const Search = () => (
  <div>
    <Helmet>
      <title>Search</title>
      <meta name="description" content="This is the search page description" />
    </Helmet>
    <Heading>Search</Heading>
    <Blurb />
  </div>
);

export default Search;
