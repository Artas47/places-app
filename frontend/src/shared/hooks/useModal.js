import React, { useState } from "react";
import Modal from "../components/modal/modal";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const RenderModal = ({ Component, visible, goBack }) => {
    return (
      <>
        {<Modal Component={Component} goBack={goBack} closeModal={hideModal} />}
      </>
    );
  };

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return { showModal, hideModal, RenderModal };
};

export default useModal;
