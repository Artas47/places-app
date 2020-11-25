import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";
import Spinner from "../../../shared/components/spinner/spinner";

const Places = () => {
  const location = useLocation();
  const [places, setPlaces] = useState(null);
  const { userId } = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const fetch = async () => {
      if (userId && location.pathname.startsWith("/places")) {
        const response = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`,
          "GET"
        );
        setPlaces(response.results);
      }
    };
    fetch();
  }, [userId, sendRequest]);

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

  if (!places || !places.length) {
    return <InfoBox label="Looks like you have no places added" />;
  }

  return (
    <>
      <ImageGallery
        path="/places"
        places={places}
        // onDeletePlace={onDeletePlace}
      />
    </>
  );
};

export default Places;
