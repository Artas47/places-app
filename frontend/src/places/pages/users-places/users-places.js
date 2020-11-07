import React, { useContext, useEffect } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useParams, useLocation } from "react-router-dom";
import PlaceList from "../../components/place-list/place-list";
import ImageGallery from "../../../gallery/pages/image-gallery/image-gallery";

const UsersPlaces = () => {
  const { setPlaces, userId, token } = useContext(AuthContext);
  return <ImageGallery path="/places" userId={userId} />;
};

export default UsersPlaces;
