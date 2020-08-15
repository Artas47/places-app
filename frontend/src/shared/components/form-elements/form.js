import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Form = (props) => {
  return <StyledForm {...props}>{props.children}</StyledForm>;
};

export default Form;
