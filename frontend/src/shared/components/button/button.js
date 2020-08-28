import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 1.2rem 5rem;
  border-radius: 2rem;
  border: 0;
  background-color: #e8e8e8;
  color: #666666;
  outline: none;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 1.6rem;
  transition: all 0.3s;
  border: 2px solid transparent;
  :hover {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.3);
    border: 2px solid #2b2b52;
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
