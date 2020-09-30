import styled from "styled-components";

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  height: 5rem;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, 0);
  font-size: 2rem;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  z-index: 10;
  :after {
    content: " ";
    position: absolute;
    bottom: 0;
    width: 120%;
    height: 0.3rem;
    display: block;
    background-color: #fff;
  }
`;
