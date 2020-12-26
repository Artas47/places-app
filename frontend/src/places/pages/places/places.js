import React, { useEffect, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";
import Spinner from "../../../shared/components/spinner/spinner";

const Places = () => {
  const location = useLocation();
  const { userId, places, setPlaces } = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const fetch = async () => {
      if (userId && location.pathname.startsWith("/places")) {
        const response = await sendRequest(
          `${process.env.REACT_APP_ROOT_API_ROUTE}/places/user/${userId}`,
          "GET"
        );
        setPlaces(response.results);
      }
    };
    fetch();
  }, [userId, sendRequest]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Spinner center />
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
      />
    </>
  );
};

export default Places;
