import React from "react";
import ReactDOM from "react-dom";
import * as Styled from "./modal.styles";
import { useHistory } from "react-router-dom";
import Fade from "../fade-animation/fade";

const Modal = ({ closeModal, Component, goBack, componentProps, styles }) => {
  const history = useHistory();
  // console.log("componentProps", componentProps);
  return ReactDOM.createPortal(
    <Fade in={true} classNames="fadeModal">
      <Styled.ModalWrapper
        onClick={() => {
          if (componentProps.path) {
            history.push(`/${componentProps.path}`);
          }
          closeModal();
        }}
      >
        <Styled.ModalContent
          style={styles}
          onClick={(e) => e.stopPropagation()}
        >
          <Component {...componentProps} />
        </Styled.ModalContent>
      </Styled.ModalWrapper>
    </Fade>,
    document.getElementById("modal")
  );
};

export default Modal;
