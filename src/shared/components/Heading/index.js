// @flow
import React from 'react';

// Styles
import styles from './Heading.scss';

type Props = {
  children: string,
};

const Heading = (props: Props) => {
  const { children } = props;
  return (
    <div>
      <p className={styles.thing}>{children}</p>
    </div>
  );
};

export default Heading;
