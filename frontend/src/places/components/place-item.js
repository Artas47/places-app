import React, { useContext } from "react";
import * as Styled from "./place-item.styles";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = ({ name, description, id, image, creatorId }) => {
  const history = useHistory();
  const { setPlaces, userId, token } = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

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
    <Styled.PlaceItem>
      <Styled.PlaceItemImg
        imageUrl={image}
        src={`http://localhost:5000/${image}`}
        style={{ width: "100%", height: "70%" }}
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
    </Styled.PlaceItem>
  );
};

export default PlaceItem;
