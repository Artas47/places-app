import React, { useState } from "react";
import Modal from "../components/modal/modal";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  const RenderModal = ({ children }) => {
    return <>{isVisible && <Modal closeModal={hideModal}>{children}</Modal>}</>;
  };

  return { showModal, hideModal, RenderModal };
};

export default useModal;
