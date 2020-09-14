import React from "react";
import PlaceItem from "./place-item";
import * as Styled from "./place-list.styles";
import Fade from "../../shared/components/fade-animation/fade";

const PlaceList = ({ places }) => {
  if (places.length === 0) {
    return (
      <Styled.NotFoundMessageBox>
        <Styled.NotFoundMessage>
          Looks like you have no places.
        </Styled.NotFoundMessage>
      </Styled.NotFoundMessageBox>
    );
  }

  return (
    <div>
      {places.map((place) => {
        return (
          <Fade in={true} classNames="fade">
            <PlaceItem
              title={place.title}
              description={place.description}
              id={place._id}
              image={place.image}
            />
          </Fade>
        );
      })}
    </div>
  );
};

export default PlaceList;
