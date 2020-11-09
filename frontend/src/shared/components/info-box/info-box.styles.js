import styled from "styled-components";

export const NotFoundMessageBox = styled.div`
  height: 20rem;
  width: 60%;
  background-color: #fff;
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  filter: opacity(0.8);
  box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  color: #616161;
`;

export const NotFoundMessage = styled.p`
  font-size: 2.2rem;
`;
