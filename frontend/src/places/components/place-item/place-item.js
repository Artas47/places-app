import React, { useContext } from "react";
import * as Styled from "./place-item.styles";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import Spinner from "../../../shared/components/spinner/spinner";

const PlaceItem = ({ name, description, id, image, creatorId }) => {
  const history = useHistory();
  const { setPlaces, userId, token } = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();

  const onDeletePlace = async () => {
    await sendRequest(
      `http://localhost:5000/api/places/${id}`,
      "DELETE",
      null,
      {
        Authorization: "Bearer " + token,
      }
    );
    const responseData = await sendRequest(
      `http://localhost:5000/api/places/user/${userId}`,
      "GET"
    );
    setPlaces(responseData.places);
  };

  return (
    <Styled.PlaceItem
      style={{
        position: "relative",
      }}
    >
      {isLoading ? (
        <Spinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1",
          }}
          className="color-white"
        />
      ) : (
        ""
      )}
      <div
        style={{ height: "100%", filter: isLoading ? "brightness(0.5)" : "" }}
      >
        <Styled.PlaceItemImg
          imageUrl={image}
          src={`http://localhost:5000/${image}`}
          style={{ width: "100%", height: "60%" }}
        />
        <Styled.PlaceItemDescription>
          <Styled.PlaceItemDescriptionName>
            {name}
          </Styled.PlaceItemDescriptionName>
          <Styled.PlaceItemDescriptionContent>
            {description}
          </Styled.PlaceItemDescriptionContent>
        </Styled.PlaceItemDescription>
        <Styled.PlanItemDescriptionButtonsContainer>
          <Styled.PlaceItemButton>View on map</Styled.PlaceItemButton>
          {userId === creatorId && (
            <Styled.PlaceItemButton
              onClick={() => history.push(`/places/edit/${id}`)}
            >
              Edit
            </Styled.PlaceItemButton>
          )}
          {userId === creatorId && (
            <Styled.PlaceItemButton onClick={onDeletePlace}>
              Delete
            </Styled.PlaceItemButton>
          )}
        </Styled.PlanItemDescriptionButtonsContainer>
      </div>
    </Styled.PlaceItem>
  );
};

export default PlaceItem;
