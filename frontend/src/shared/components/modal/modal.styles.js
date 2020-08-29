import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  transition: all 1s;
`;

export const ModalContent = styled.div`
  width: 40rem;
  margin: 0 auto;
  transition: all 1s;
`;
