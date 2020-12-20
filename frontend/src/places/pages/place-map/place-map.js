import React, { useEffect, useState } from "react";
import GoogleMap from "../../../shared/components/google-map/google-map";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Modal from "../../../shared/components/modal/modal";

const PlaceMap = ({ path }) => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const { sendRequest } = useHttpClient();
  const [placeCords, setPlaceCords] = useState(null);


  useEffect(() => {
    if (params.placeId) {
      setShowModal(true);
      const fetch = async () => {
        let response;
        if (params.placeId) {
          response = await sendRequest(
            `http://localhost:5000/api/places/${params.placeId}`,
            "GET"
          );
        }
        if (response.place.location) {
          const cords = {
            lat: response.place.location.coordinates.lat,
            lng: response.place.location.coordinates.lng,
            zoom: response.place.location.zoom,
          };
          setPlaceCords(cords);
        }
      };
      fetch();
    }
  }, [params, sendRequest]);

  if (!placeCords) {
    return null;
  }

  return (
    <div>
      {showModal && (
        <Modal setShowModal={setShowModal} path={path}>
          <GoogleMap placeCords={placeCords} />
        </Modal>
      )}
    </div>
  );
};

export default PlaceMap;
