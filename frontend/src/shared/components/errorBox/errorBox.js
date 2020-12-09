import React from "react";
import styled from "styled-components";

const StyledErrorBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  font-size: 18px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  color: #eb2f06;
`;

const ErrorBox = ({ children }) => {
  return <StyledErrorBox>{children}</StyledErrorBox>;
};

export default ErrorBox;
