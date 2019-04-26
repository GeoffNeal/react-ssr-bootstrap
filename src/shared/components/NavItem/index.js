import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

// Styles
// import styles from './styles.scss';

const NavItem = props => {
  const { href, text } = props;
  return <Link to={href}>{text}</Link>;
};

NavItem.propTypes = {
  href: string.isRequired,
  text: string.isRequired,
};

export default NavItem;
