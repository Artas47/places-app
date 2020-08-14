import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  letter-spacing: 1px;
  color: #8f8f8f;
  align-self: flex-start;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const Label = (props) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
};

export default Label;
