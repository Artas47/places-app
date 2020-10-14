import React from "react";
import ReactDOM from "react-dom";
import * as Styled from "./modal.styles";
import { useHistory } from "react-router-dom";
import Fade from "../fade-animation/fade";

const Modal = ({ closeModal, Component, goBack }) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <Fade in={true} classNames="fadeModal">
      <Styled.ModalWrapper
        onClick={() => (goBack ? history.goBack() : closeModal())}
      >
        <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
          <Component />
        </Styled.ModalContent>
      </Styled.ModalWrapper>
    </Fade>,
    document.getElementById("modal")
  );
};

export default Modal;
