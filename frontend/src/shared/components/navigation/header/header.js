import React, { useContext } from 'react';
import { AuthContext } from '../../../../shared/context/auth-context';
import * as Styles from './header.styles';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <Styles.Header>
      <Styles.Logo>Places_</Styles.Logo>
      <Styles.Nav>
        <Styles.NavLinkItem to={'/'}>All users</Styles.NavLinkItem>
        {isLoggedIn ? (
          <>
            <Styles.NavLinkItem to={'/places'}>My places</Styles.NavLinkItem>
            <Styles.NavLinkItem to={'/places/new'}>
              Add place
            </Styles.NavLinkItem>{' '}
          </>
        ) : (
          ''
        )}
        {!isLoggedIn ? (
          <Styles.NavLinkItem to={'/auth'}>Log in</Styles.NavLinkItem>
        ) : (
          <Styles.NavLinkItem onClick={logout} to={'/'}>
            Log out
          </Styles.NavLinkItem>
        )}
      </Styles.Nav>
    </Styles.Header>
  );
};

export default Header;
