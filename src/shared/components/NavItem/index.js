import React from 'react';
import { NavLink } from 'react-router-dom';
import { string, bool, shape } from 'prop-types';

// Styles
import styles from './NavItem.scss';

const NavItem = ({ href, text, attrs }) => {
  return (
    <NavLink
      className={styles.link}
      activeClassName={styles.active}
      to={href}
      {...attrs}
    >
      {text}
    </NavLink>
  );
};

NavItem.propTypes = {
  href: string.isRequired,
  text: string.isRequired,
  attrs: shape({
    exact: bool,
  }),
};

NavItem.defaultProps = {
  attrs: {},
};

export default NavItem;
