import React, { useState } from "react";
import Modal from "../components/modal/modal";

const useModal = (visible) => {
  // console.log("visible", visible);
  const [isVisible, setIsVisible] = useState(visible);
  console.log("isVisible", isVisible);

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
