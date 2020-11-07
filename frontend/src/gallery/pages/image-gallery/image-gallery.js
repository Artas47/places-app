import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Spinner from "../../../shared/components/spinner/spinner";
import GalleryImageItem from "../../components/gallery-image-item/gallery-image-item";
import useScroll from "../../../shared/hooks/useScroll";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

const ImageGallery = () => {
  const [randomPlaces, setRandomPlaces] = useState({
    placesForGallery: [],
    placesForModal: [],
  });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rowHeight, setRowHeight] = useState(300);
  const { userId } = useContext(AuthContext);
  const location = useLocation();

  const increaseRowHeight = () => {
    setRowHeight(rowHeight + 150);
  };
  useScroll("image-gallery");
  const openLightbox = useCallback((event, { photo, index }) => {
    setPhotoIndex(index);
    setIsOpen(true);
  }, []);

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <GalleryImageItem
        key={key}
        index={index}
        photo={photo}
        margin={8}
        left={left}
        // direction="column"
        top={top}
        openLightbox={openLightbox}
      />
    ),
    [openLightbox]
  );

  useEffect(() => {
    const fetchRandomPlaces = async () => {
      setIsLoading(true);
      let response;
      if (location.pathname === "/gallery") {
        response = await axios.get("http://localhost:5000/api/places/random");
      }
      if (location.pathname === "/places" && userId) {
        response = await axios.get(
          `http://localhost:5000/api/places/user/${userId}`
        );
      }
      console.log("response", response);
      let placesGallery = [];
      let placesModal = [];
      response.data.results.forEach((place) => {
        placesGallery.push({
          src: `http://localhost:5000/${place.image.imageUrl}`,
          width: place.image.width,
          height: place.image.height,
          creatorId: place.creator,
        });
        placesModal.push(`http://localhost:5000/${place.image.imageUrl}`);
      });
      setRandomPlaces((places) => ({
        ...places,
        placesForGallery: placesGallery,
        placesForModal: placesModal,
      }));
      setIsLoading(false);
    };
    fetchRandomPlaces();
    return () => {
      console.log("I RUN");
    };
  }, []);

  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        position: "relative",
        margin: "0 auto",
      }}
      id="image-gallery"
    >
      <button onClick={increaseRowHeight}>ASDASD</button>
      {isLoading ? (
        <Spinner
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1",
          }}
          className="color-white"
        />
      ) : (
        <Gallery
          renderImage={imageRenderer}
          photos={randomPlaces.placesForGallery}
          onClick={openLightbox}
          margin={8}
          targetRowHeight={rowHeight}
          // direction={"column"}
        />
      )}
      {isOpen && (
        <Lightbox
          mainSrc={randomPlaces.placesForModal[photoIndex]}
          nextSrc={
            randomPlaces.placesForModal[
              (photoIndex + 1) % randomPlaces.placesForModal.length
            ]
          }
          prevSrc={
            randomPlaces.placesForModal[
              (photoIndex + randomPlaces.placesForModal.length - 1) %
                randomPlaces.placesForModal.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + randomPlaces.placesForModal.length - 1) %
                randomPlaces.placesForModal.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(
              (photoIndex + randomPlaces.placesForModal.length + 1) %
                randomPlaces.placesForModal.length
            )
          }
        />
      )}
    </div>
  );
};

export default ImageGallery;
