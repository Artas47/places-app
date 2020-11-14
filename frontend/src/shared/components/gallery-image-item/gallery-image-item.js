import React, { useState, useContext } from "react";
import Spinner from "../../../shared/components/spinner/spinner";
import * as Styled from "./gallery-image-item.styles";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation } from "react-router-dom";

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
  onDeletePlace,
}) => {
  const [isLoaded, setIsLoaded] = useState("loading");
  const location = useLocation();
  const { userId } = useContext(AuthContext);
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
  console.log("photo", photo);
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
          {/* <Styled.GalleryImageButton>View on map</Styled.GalleryImageButton> */}
          <Styled.ImageDescriptionWrapper>
            <Styled.ImageTitle>{photo.creator.name}</Styled.ImageTitle>
            <Styled.ImageAuthor>{photo.title}</Styled.ImageAuthor>
          </Styled.ImageDescriptionWrapper>
          {/* {photo.creatorId === userId && location.pathname === "/places" && (
            <>
              <Styled.GalleryImageButton
                onClick={() => onDeletePlace(photo.id)}
              >
                Delete
              </Styled.GalleryImageButton>
              <Styled.GalleryImageButton>Edit</Styled.GalleryImageButton>
            </>
          )} */}
        </Styled.ImageFooter>
      </Styled.ImageWrapper>
    </div>
  );
};

export default GalleryImageItem;
