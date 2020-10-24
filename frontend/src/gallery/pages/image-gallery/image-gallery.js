import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Spinner from "../../../shared/components/spinner/spinner";
import SelectedImage from "../../components/image";

const ImageGallery = () => {
  const [randomPlaces, setRandomPlaces] = useState({
    placesForGallery: [],
    placesForModal: [],
  });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openLightbox = useCallback((event, { photo, index }) => {
    setPhotoIndex(index);
    setIsOpen(true);
  }, []);

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        openLightbox={openLightbox}
      />
    ),
    []
  );

  useEffect(() => {
    const fetchRandomPlaces = async () => {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/places/random"
      );
      let placesGallery = [];
      let placesModal = [];
      response.data.randomPlaces.forEach((place) => {
        placesGallery.push({
          src: `http://localhost:5000/${place.image.imageUrl}`,
          width: place.image.width,
          height: place.image.height,
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
  }, []);

  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        position: "relative",
        margin: "0 auto",
      }}
    >
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
