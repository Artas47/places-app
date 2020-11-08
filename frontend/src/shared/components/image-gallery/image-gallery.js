import React, { useEffect, useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Spinner from "../spinner/spinner";
import GalleryImageItem from "../gallery-image-item/gallery-image-item";
import useScroll from "../../hooks/useScroll";

const ImageGallery = ({ places, onDeletePlace }) => {
  const [randomPlaces, setRandomPlaces] = useState({
    placesForGallery: [],
    placesForModal: [],
  });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rowHeight, setRowHeight] = useState(300);

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
        onDeletePlace={onDeletePlace}
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

      let placesGallery = [];
      let placesModal = [];

      if (places?.length) {
        places.forEach((place) => {
          placesGallery.push({
            src: `http://localhost:5000/${place.image.imageUrl}`,
            width: place.image.width,
            height: place.image.height,
            creatorId: place.creator,
            id: place._id,
          });
          placesModal.push(`http://localhost:5000/${place.image.imageUrl}`);
        });
      }
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
  }, [places]);

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
