import React from 'react';
import * as Styles from './header.styles';

const Header = () => {
  return (
    <Styles.Header>
      <Styles.Logo>Places_</Styles.Logo>
      <Styles.Nav>
        <Styles.NavLink to={'/'}>All users</Styles.NavLink>
        <Styles.NavLink to={'/places'}>My places</Styles.NavLink>
        <Styles.NavLink to={'/places/new'}>Add place</Styles.NavLink>
        <Styles.NavLink>LOGOUT</Styles.NavLink>
      </Styles.Nav>
    </Styles.Header>
  );
};

export default Header;
