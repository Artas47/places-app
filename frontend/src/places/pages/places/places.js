import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";
import Spinner from "../../../shared/components/spinner/spinner";
import useModal from "../../../shared/hooks/useModal";
import GoogleMap from "../../../shared/components/google-map/google-map";

const Test = () => {
  return <div>fsdsdfds</div>;
};

const Places = () => {
  const location = useLocation();
  const [places, setPlaces] = useState(null);
  const { userId, token } = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();
  const { RenderModal, showModal, hideModal } = useModal();

  const onDeletePlace = async (id) => {
    await axios.delete(`http://localhost:5000/api/places/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await axios.get(
      `http://localhost:5000/api/places/user/${userId}`
    );
    setPlaces(responseData.data.results);
  };

  useEffect(() => {
    const fetch = async () => {
      if (userId) {
        const response = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`,
          "GET"
        );
        setPlaces(response.results);
      }
    };
    fetch();
  }, [userId]);

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
      <RenderModal
        Component={GoogleMap}
        componentProps={{ path: "places" }}
        styles={{
          width: "90%",
        }}
      />
      <ImageGallery
        path="/places"
        places={places}
        onDeletePlace={onDeletePlace}
        showModal={showModal}
      />

      {/* {showModal()}
      <RenderModal Component={<ImageGallery />} goBack /> */}
    </>
  );
};

export default Places;
