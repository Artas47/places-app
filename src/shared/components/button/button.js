import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  /* width: 5rem; */
  padding: 1.2rem 5rem;
  border-radius: 2rem;
  border: 0;
  background-color: #e8e8e8;
  color: #666666;
  outline: none;
  margin-top: 2rem;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);
  font-size: 1.6rem;
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
