import React, { useState } from "react";
import Spinner from "../../../shared/components/spinner/spinner";
import * as Styled from "./gallery-image-item.styles";

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const GalleryImageItem = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected,
  openLightbox,
}) => {
  const [isLoaded, setIsLoaded] = useState("loading");

  const handleImageLoaded = () => {
    setIsLoaded("loaded");
  };

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  const handleOnClick = (e, { photo, index }) => {
    openLightbox(e, { photo, index });
  };

  return (
    <div
      style={{
        margin,
        height: photo.height,
        width: photo.width,
        ...cont,
        backgroundColor: "red !important",
      }}
    >
      {isLoaded === "loading" ? (
        <Spinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        ""
      )}
      <Styled.Image
        visible={isLoaded === "loaded"}
        onLoad={handleImageLoaded}
        alt={photo.title}
        style={{
          opacity: isLoaded === "loaded" && "1",
        }}
        {...photo}
        onClick={(e) => handleOnClick(e, { photo, index })}
      />
    </div>
  );
};

export default GalleryImageItem;
