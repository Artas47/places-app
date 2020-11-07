import React, { useContext, useEffect } from "react";
import PlaceList from "../../components/place-list/place-list";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import Spinner from "../../../shared/components/spinner/spinner";
import ImageGallery from "../../../gallery/pages/image-gallery/image-gallery";

const Places = () => {
  const { setPlaces, userId, token } = useContext(AuthContext);
  return <ImageGallery path="/places" userId={userId} />;
};

export default Places;
