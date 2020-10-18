import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./image-gallery.styles";
import LazyLoad from "react-lazyload";
import GalleryItem from "../../components/gallery-item/item";

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

const ImageGallery = () => {
  const [randomPlaces, setRandomPlaces] = useState([]);
  useEffect(() => {
    const fetchRandomPlaces = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/places/random"
      );
      let places = [];
      response.data.randomPlaces.forEach((place) => {
        places.push({
          src: `http://localhost:5000/${place.image}`,
        });
      });
      setRandomPlaces(places);
    };
    fetchRandomPlaces();
  }, []);

  return (
    <div
      style={{
        display: "block",
        minHeight: "1px",
        width: "90%",
        overflow: "auto",
        margin: "0 auto",
      }}
    >
      <S.GalleryList>
        {randomPlaces.map((place, i) => {
          return (
            <LazyLoad key={i} height={200}>
              <GalleryItem imgUrl={place.src} />
            </LazyLoad>
          );
        })}
      </S.GalleryList>
    </div>
  );
};

export default ImageGallery;
