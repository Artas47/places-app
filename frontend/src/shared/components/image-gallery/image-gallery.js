import React, { useEffect, useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Spinner from "../spinner/spinner";
import GalleryImageItem from "../gallery-image-item/gallery-image-item";
import useScroll from "../../hooks/useScroll";
import * as Styled from "./image-gallery.styles";

const ImageGallery = ({ places, onDeletePlace, showModal, path }) => {
  const [randomPlaces, setRandomPlaces] = useState({
    placesForGallery: [],
    placesForModal: [],
  });

  const modalPlaces = randomPlaces.placesForModal;

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        margin={3}
        showModal={showModal}
        left={left}
        onDeletePlace={onDeletePlace}
        path={path}
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
      if (places?.length < 4) {
        places.forEach((place) => {
          placesGallery.push({
            src: `http://localhost:5000/${place.image.imageUrl}`,
            width: 0,
            height: 0,
            creator: place.creator,
            id: place._id,
            title: place.title,
          });
          placesModal.push(`http://localhost:5000/${place.image.imageUrl}`);
        });
      } else if (places?.length > 3) {
        places.forEach((place) => {
          placesGallery.push({
            src: `http://localhost:5000/${place.image.imageUrl}`,
            width: place.image.width,
            height: place.image.height,
            creator: place.creator,
            id: place._id,
            title: place.title,
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
  }, [places]);

  return (
    <Styled.GalleryWrapper id="image-gallery">
      {isLoading ? (
        <Spinner center className="color-white" />
      ) : (
        <Gallery
          renderImage={imageRenderer}
          photos={randomPlaces.placesForGallery}
          onClick={openLightbox}
          margin={3}
        />
      )}
      {isOpen && (
        <Lightbox
          mainSrc={modalPlaces[photoIndex]}
          nextSrc={modalPlaces[(photoIndex + 1) % modalPlaces.length]}
          prevSrc={
            modalPlaces[
              (photoIndex + modalPlaces.length - 1) % modalPlaces.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + modalPlaces.length - 1) % modalPlaces.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(
              (photoIndex + modalPlaces.length + 1) % modalPlaces.length
            )
          }
        />
      )}
    </Styled.GalleryWrapper>
  );
};

export default ImageGallery;
