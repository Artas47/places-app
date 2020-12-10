import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 1.1rem 5rem;
  width: 100%;
  border: 0;
  background-color: #4a4a4f;
  color: #fff;
  outline: none;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 1.6rem;
  transition: all 0.3s;
  border: 2px solid transparent;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
