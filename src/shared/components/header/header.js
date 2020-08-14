import React from 'react';
import * as Styles from './header.styles';

const Header = () => {
  return (
    <Styles.Header>
      <Styles.Logo>Places_</Styles.Logo>
      <Styles.Nav>
        <Styles.NavLinkItem to={'/'}>All users</Styles.NavLinkItem>
        <Styles.NavLinkItem to={'/places'}>My placess</Styles.NavLinkItem>
        <Styles.NavLinkItem to={'/places/new'}>Add place</Styles.NavLinkItem>
        <Styles.NavLinkItem to='/'>LOGOUT</Styles.NavLinkItem>
      </Styles.Nav>
    </Styles.Header>
  );
};

export default Header;
