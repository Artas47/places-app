import React from "react";
import ReactDOM from "react-dom";
import * as Styled from "./modal.styles";
import { useHistory } from "react-router-dom";
import Fade from "../fade-animation/fade";

const Modal = ({ path, children, setShowModal }) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <Fade in={true} classNames="fadeModal">
      <Styled.ModalWrapper
        onClick={() => {
          if (path) {
            history.push(`/${path}`);
          }
          setShowModal(false);
        }}
      >
        <Styled.ModalContent
          // style={styles}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {/* <Component {...componentProps} /> */}
        </Styled.ModalContent>
      </Styled.ModalWrapper>
    </Fade>,
    document.getElementById("modal")
  );
};

export default Modal;
