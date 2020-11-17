import React, { useState } from "react";
import Modal from "../components/modal/modal";

const useModal = (visible) => {
  const [isVisible, setIsVisible] = useState(visible);

  const RenderModal = ({ Component, componentProps, goBack, styles }) => {
    return (
      <>
        {isVisible && (
          <Modal
            Component={Component}
            componentProps={componentProps}
            goBack={goBack}
            styles={styles}
            closeModal={hideModal}
          />
        )}
      </>
    );
  };

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return { showModal, hideModal, RenderModal };
};

export default useModal;
