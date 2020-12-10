import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  width: 100%;
  outline: none;
  border: none;
  background-color: #e6e6e6;
  color: #666666;
  font-size: 1.6rem;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  margin-top: 0.5rem;
  :focus {
    border-bottom: 2px solid rgba(79, 146, 227, 0.74);
  }
`;

const Input = (props) => {
  return <StyledInput autoComplete={"off"} ref={props.register} {...props} />;
};

export default Input;
