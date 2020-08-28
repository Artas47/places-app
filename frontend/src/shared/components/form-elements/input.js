import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  width: 100%;
  outline: none;
  border: none;
  background-color: #e8e8e8;
  margin-bottom: 4rem;
  color: #666666;
  font-size: 1.6rem;
`;

const Input = (props) => {
  return <StyledInput autoComplete={'off'} ref={props.register} {...props} />;
};

export default Input;
