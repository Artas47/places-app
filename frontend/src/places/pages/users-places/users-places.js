import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import Fade from "../../../shared/components/fade-animation/fade";
import InfoBox from "../../../shared/components/info-box/info-box";

const UsersPlaces = () => {
  const location = useLocation();
  const params = useParams();
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      if (params.userId) {
        const response = await axios.get(
          `http://localhost:5000/api/places/user/${params.userId}`
        );
        setPlaces(response.data.results);
      }
    };
    fetch();
  }, []);

  if (!places || !places.length) {
    return <InfoBox label="This user doesn't have any places added" />;
  }

  return <ImageGallery path="/places" places={places} />;
};

export default UsersPlaces;
