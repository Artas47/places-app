import React, { useState, useContext } from "react";
import Spinner from "../../../shared/components/spinner/spinner";
import * as Styled from "./gallery-image-item.styles";
import { AuthContext } from "../../../shared/context/auth-context";

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
  console.log("photo", photo);
  const { setPlaces, userId, token } = useContext(AuthContext);
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
        backgroundColor: "transparent !important",
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
      <Styled.ImageWrapper>
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
        <Styled.ImageFooter>
          <Styled.GalleryImageButton>View on map</Styled.GalleryImageButton>
          {photo.creatorId === userId && (
            <>
              <Styled.GalleryImageButton>Delete</Styled.GalleryImageButton>
              <Styled.GalleryImageButton>Edit</Styled.GalleryImageButton>
            </>
          )}
        </Styled.ImageFooter>
      </Styled.ImageWrapper>
    </div>
  );
};

export default GalleryImageItem;
