import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Spinner from "../../../shared/components/spinner/spinner";
import GoogleMap from "../../../shared/components/google-map/google-map";
import useModal from "../../../shared/hooks/useModal";

const RandomPlaces = () => {
  const location = useLocation();
  const [places, setPlaces] = useState(null);
  const { sendRequest, isLoading } = useHttpClient();

  const { RenderModal, showModal, hideModal } = useModal();

  useEffect(() => {
    const fetch = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/places/random",
        "GET"
      );
      setPlaces(response.results);
    };
    fetch();
  }, []);

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Spinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <RenderModal
        Component={GoogleMap}
        componentProps={{ path: "places" }}
        styles={{
          width: "90%",
        }}
      />
      <ImageGallery path="/places" places={places} showModal={showModal} />{" "}
    </>
  );
};

export default RandomPlaces;
