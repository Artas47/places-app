import React, { useContext, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useParams } from "react-router-dom";
import PlaceList from "../components/place-list";

const UsersPlaces = () => {
  const { sendRequest } = useHttpClient();
  const { places, setPlaces } = useContext(AuthContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`,
          "GET"
        );
        setPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();

    return () => {
      setPlaces([]);
    };
  }, [sendRequest, setPlaces, userId]);

  return <PlaceList places={places} />;
};

export default UsersPlaces;
