import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";
import Spinner from "../../../shared/components/spinner/spinner";

const Gallery = () => {
  const [places, setPlaces] = useState(null);
  const { userId } = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const fetch = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/places/random",
        "GET"
      );
      setPlaces(response.results);
    };
    fetch();
  }, [userId, sendRequest]);

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Spinner center />
      </div>
    );
  }

  if (!places || !places.length) {
    return <InfoBox label="Looks like there is no places..." />;
  }

  return <ImageGallery path="/gallery" places={places} />;
};

export default Gallery;
