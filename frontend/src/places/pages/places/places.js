import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../shared/context/auth-context";

const Places = () => {
  const location = useLocation();
  const [places, setPlaces] = useState(null);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      if (location.pathname === "/places" && userId) {
        const response = await axios.get(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setPlaces(response.data.results);
      }
    };
    fetch();
  }, [userId]);

  return <ImageGallery path="/places" places={places} />;
};

export default Places;
