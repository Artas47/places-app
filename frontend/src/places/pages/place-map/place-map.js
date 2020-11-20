import React, { useEffect } from "react";
import useModal from "../../../shared/hooks/useModal";
import GoogleMap from "../../../shared/components/google-map/google-map";
import { useLocation } from "react-router-dom";

const PlaceMap = () => {
  const location = useLocation();
  const { RenderModal, showModal, hideModal } = useModal(false);
  console.log("location", location);
  useEffect(() => {
    if (location.pathname.startsWith("/places/mapView")) {
      showModal();
    }
  }, [location]);
  return (
    <RenderModal
      Component={GoogleMap}
      componentProps={{ path: "places" }}
      styles={{
        width: "90%",
      }}
    />
  );
};

export default PlaceMap;
