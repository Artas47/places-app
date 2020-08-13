import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  width: 100%;
  background-color: #bfbfbf;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const Logo = styled.h2`
  color: #8a8a8a;
  letter-spacing: 2px;
  z-index: 10;
  margin-left: 3rem;
`;

export const Nav = styled.nav`
  display: flex;
  list-style: none;
  margin-right: 3rem;
`;

export const NavLink = styled(Link)`
  padding: 1.5rem;
  /* height: 1rem;
  width: 10rem; */
  letter-spacing: 0.7px;
  color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  text-decoration: none;
`;
