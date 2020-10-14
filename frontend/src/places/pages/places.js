import React, { useContext, useEffect } from "react";
import PlaceList from "../components/place-list";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Spinner from "../../shared/components/spinner/spinner";

const Places = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { userId, places, setPlaces } = useContext(AuthContext);

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
  }, [sendRequest, userId, setPlaces]);

  const renderPlacesContent = () => {
    if (isLoading) {
      return <Spinner className={["centered", "color-white"]} />;
    } else {
      return <PlaceList places={places} />;
    }
  };

  return <div>{renderPlacesContent()}</div>;
};

export default Places;
