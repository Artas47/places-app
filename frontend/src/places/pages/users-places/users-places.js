import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";

const UsersPlaces = () => {
  const location = useLocation();
  const params = useParams();
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      if (location.pathname.startsWith("/places/user/") && params.userId) {
        const response = await axios.get(
          `http://localhost:5000/api/places/user/${params.userId}`
        );
        setPlaces(response.data.results);
      }
    };
    fetch();
  }, []);
  return <ImageGallery path="/places" places={places} />;
};

export default UsersPlaces;
