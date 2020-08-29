import React from 'react';
import * as Styled from './modal.styles';
import { useHistory } from 'react-router-dom';
import UpdatePlace from '../../../places/pages/update-place';
import Fade from '../fade-animation/fade';

const Modal = () => {
  const history = useHistory();
  return (
    <Fade in={true} classNames='fadeModal'>
      <Styled.ModalWrapper onClick={() => history.goBack()}>
        <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
          <UpdatePlace />
        </Styled.ModalContent>
      </Styled.ModalWrapper>
    </Fade>
  );
};

export default Modal;
