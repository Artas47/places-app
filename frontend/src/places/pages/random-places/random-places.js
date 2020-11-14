import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";

const RandomPlaces = () => {
  const location = useLocation();
  const [places, setPlaces] = useState(null);
  console.log("fdsds", "fdsds");
  useEffect(() => {
    const fetch = async () => {
      if (location.pathname === "/" || location.pathname === "/gallery") {
        const response = await axios.get(
          "http://localhost:5000/api/places/random"
        );
        setPlaces(response.data.results);
      }
    };
    fetch();
  }, []);

  return <ImageGallery path="/places" places={places} />;
};

export default RandomPlaces;
