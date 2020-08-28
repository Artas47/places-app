import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
  width: 100%;
  background-color: rgba(125, 125, 125, 0.1);
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.2);
`;

export const Logo = styled.h2`
  color: #8a8a8a;
  letter-spacing: 2px;
  margin-left: 3rem;
  font-size: 2rem;
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex;
  list-style: none;
  margin-right: 3rem;
`;

export const NavLinkItem = styled(NavLink)`
  padding: 1.5rem;
  /* height: 1rem;
  width: 10rem; */
  font-size: 1.6rem;
  letter-spacing: 0.7px;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
`;
