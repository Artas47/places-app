import React from "react";
import ReactDOM from "react-dom";
import * as Styled from "./modal.styles";
import { useHistory } from "react-router-dom";
import UpdatePlace from "../../../places/pages/update-place";
import Fade from "../fade-animation/fade";

const Modal = (e) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <Fade in={true} classNames="fadeModal">
      <Styled.ModalWrapper onClick={() => history.goBack()}>
        <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
          <UpdatePlace />
        </Styled.ModalContent>
      </Styled.ModalWrapper>
    </Fade>,
    document.getElementById("modal")
  );
};

export default Modal;
