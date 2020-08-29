import React, { useContext } from 'react';
import * as Styled from './place-item.styles';
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = ({ name, description, id }) => {
  const history = useHistory();
  const { setPlaces, userId } = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();

  const onDeletePlace = async () => {
    await sendRequest(`http://localhost:5000/api/places/${id}`, 'DELETE');
    const responseData = await sendRequest(
      `http://localhost:5000/api/places/user/${userId}`,
      'GET'
    );
    setPlaces(responseData.places);
  };

  return (
    <Styled.PlaceItem>
      <Styled.PlaceItemImg />
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
        <Styled.PlaceItemButton
          onClick={() => history.push(`/places/edit/${id}`)}
        >
          Edit
        </Styled.PlaceItemButton>
        <Styled.PlaceItemButton onClick={onDeletePlace}>
          Delete
        </Styled.PlaceItemButton>
      </Styled.PlanItemDescriptionButtonsContainer>
    </Styled.PlaceItem>
  );
};

export default PlaceItem;
