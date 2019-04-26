import React from 'react';
import { string, arrayOf, shape } from 'prop-types';

// Components
import NavItem from '../NavItem';

// Styles
import styles from './styles.scss';

const Navigation = props => {
  const { items } = props;
  return (
    <nav>
      <ul className={styles.navigation}>
        {items.map(item => (
          <li className={styles.listItem} key={item.text}>
            <NavItem key={item.href} {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  items: arrayOf(
    shape({
      href: string.isRequired,
      text: string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Navigation;
