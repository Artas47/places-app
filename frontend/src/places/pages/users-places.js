import React, { useContext, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useParams } from "react-router-dom";
import PlaceList from "../components/place-list";

const UsersPlaces = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { userId, places, setPlaces } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${params.userId}`,
          "GET"
        );
        setPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId, setPlaces]);
  console.log("places", places);
  return <PlaceList places={places} />;
};

export default UsersPlaces;
