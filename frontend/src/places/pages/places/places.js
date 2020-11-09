import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";

const Places = () => {
  const location = useLocation();
  const [places, setPlaces] = useState(null);
  const { userId, token } = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();

  const onDeletePlace = async (id) => {
    await sendRequest(
      `http://localhost:5000/api/places/${id}`,
      "DELETE",
      null,
      {
        Authorization: "Bearer " + token,
      }
    );
    const responseData = await sendRequest(
      `http://localhost:5000/api/places/user/${userId}`,
      "GET"
    );
    setPlaces(responseData.results);
  };

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

  if (!places || !places.length) {
    return <InfoBox label="Looks like you have no places added" />;
  }

  return (
    <ImageGallery
      path="/places"
      places={places}
      onDeletePlace={onDeletePlace}
    />
  );
};

export default Places;
