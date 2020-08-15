import React from 'react';
import * as Styled from './place-item.styles';

const PlaceItem = ({ name, description }) => {
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
        <Styled.PlaceItemButton>Edit</Styled.PlaceItemButton>
        <Styled.PlaceItemButton>Delete</Styled.PlaceItemButton>
      </Styled.PlanItemDescriptionButtonsContainer>
    </Styled.PlaceItem>
  );
};

export default PlaceItem;
