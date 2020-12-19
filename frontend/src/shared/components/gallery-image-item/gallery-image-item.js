import React, { useState, useContext } from "react";
import Spinner from "../../../shared/components/spinner/spinner";
import * as Styled from "./gallery-image-item.styles";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";
import MapIcon from "@material-ui/icons/Map";

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
  openLightbox,
  onDeletePlace,
  path,
}) => {
  const [isLoaded, setIsLoaded] = useState("loading");
  const location = useLocation();
  const { userId } = useContext(AuthContext);
  const history = useHistory();
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
      {isLoaded === "loading" ? <Spinner center /> : ""}
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
          {location.pathname !== "/places" && (
            <Styled.ImageDescriptionWrapper>
              <Styled.ImageTitle>{photo.creator.name}</Styled.ImageTitle>
              <Styled.ImageAuthor>{photo.title}</Styled.ImageAuthor>
            </Styled.ImageDescriptionWrapper>
          )}
          {photo.creator === userId && location.pathname === "/places" && (
            <>
              <Styled.GalleryImageButton
                onClick={() => onDeletePlace(photo.id)}
              >
                Delete
              </Styled.GalleryImageButton>
              <Styled.GalleryImageButton>Edit</Styled.GalleryImageButton>
            </>
          )}
          <MapIcon
            onClick={() => {
              history.push(`${path}/mapView/${photo.id}`);
            }}
            style={{
              position: "absolute",
              right: "2rem",
              bottom: '1rem',
              height: "3rem",
              width: "3rem",
            }}
          />
        </Styled.ImageFooter>
      </Styled.ImageWrapper>
    </div>
  );
};

export default GalleryImageItem;
