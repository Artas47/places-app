import React, { useEffect, useState } from "react";
import useModal from "../../../shared/hooks/useModal";
import GoogleMap from "../../../shared/components/google-map/google-map";
import { useLocation, useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const PlaceMap = ({ path }) => {
  const location = useLocation();
  const params = useParams();
  // console.log("params", params);
  const { RenderModal, showModal, hideModal } = useModal(false);
  const { sendRequest, isLoading } = useHttpClient();
  const [placeCords, setPlaceCords] = useState(null);

  useEffect(() => {
    if (params.placeId) {
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
            lat: response.place.location.lat,
            lng: response.place.location.lng,
          };
          setPlaceCords(cords);
          // setPlace(response.place);
        }
      };
      fetch();
    }
  }, [params]);

  useEffect(() => {
    if (
      location.pathname.startsWith("/places/mapView") ||
      location.pathname.startsWith("/gallery/mapView")
    ) {
      showModal();
    } else {
      hideModal();
    }
  }, [location]);

  if (!placeCords) {
    return null;
  }

  return (
    <RenderModal
      Component={GoogleMap}
      componentProps={{ path, placeCords }}
      styles={{
        width: "90%",
      }}
    />
  );
};

export default PlaceMap;
