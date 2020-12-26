import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import InfoBox from "../../../shared/components/info-box/info-box";

const UsersPlaces = () => {
  const params = useParams();
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      if (params.userId) {
        const response = await axios.get(
          `${process.env.REACT_APP_ROOT_API_ROUTE}/places/user/${params.userId}`
        );
        setPlaces(response.data.results);
      }
    };
    fetch();
  }, [fetch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!places || !places.length) {
    return <InfoBox label="This user doesn't have any places added" />;
  }

  return <ImageGallery path="/places" places={places} />;
};

export default UsersPlaces;
