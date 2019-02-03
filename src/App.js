// @flow
import React from 'react';

import TestContainer from 'Containers/Test';
import styles from './test.scss';

const App = () => (
  <div className={styles.test}>
    <h1>Hello World</h1>
    <TestContainer />
  </div>
);

export default App;
