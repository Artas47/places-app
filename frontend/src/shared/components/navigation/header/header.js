import React, { useContext } from "react";
import { AuthContext } from "../../../../shared/context/auth-context";
import * as Styles from "./header.styles";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Styles.Header>
      <Styles.Logo onClick={() => history.push("/")}>Places_</Styles.Logo>
      <Styles.Nav>
        <Styles.NavLinkItem to={"/gallery"}>
          Random users gallery
        </Styles.NavLinkItem>
        {isLoggedIn ? (
          <>
            <Styles.NavLinkItem to={"/places"}>My places</Styles.NavLinkItem>
            <Styles.NavLinkItem to={"/places/new"}>
              Add place
            </Styles.NavLinkItem>{" "}
          </>
        ) : (
          ""
        )}
        {!isLoggedIn ? (
          <Styles.NavLinkItem to={"/auth"}>Log in</Styles.NavLinkItem>
        ) : (
          <Styles.NavLinkItem onClick={logout} to={"/"}>
            Log out
          </Styles.NavLinkItem>
        )}
      </Styles.Nav>
    </Styles.Header>
  );
};

export default Header;
