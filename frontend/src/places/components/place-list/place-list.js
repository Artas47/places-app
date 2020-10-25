import React from "react";
import PlaceItem from "../place-item/place-item";
import * as Styled from "./place-list.styles";
import Fade from "../../../shared/components/fade-animation/fade";
import CustomButton from "../../../shared/components/button/button";
import { useHistory, useParams } from "react-router-dom";

const PlaceList = ({ places }) => {
  const history = useHistory();
  const params = useParams();
  // console.log("params", params);

  const renderNoPlaces = () => {
    return (
      <Fade in={true} classNames="fade">
        <Styled.NotFoundMessageBox>
          <Styled.NotFoundMessage>
            {params.userId
              ? "This user doesn't have any places."
              : "Looke like you have no places."}
          </Styled.NotFoundMessage>
          {!params.userId ? (
            <>
              <p
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "300",
                  margin: "1rem 0",
                }}
              >
                What about creating one?
              </p>
              <CustomButton onClick={() => history.push("/places/new")}>
                Create place
              </CustomButton>
            </>
          ) : (
            ""
          )}
        </Styled.NotFoundMessageBox>
      </Fade>
    );
  };

  return (
    <Fade in={true} classNames="fade">
      <div>
        {!places.length && renderNoPlaces()}
        {places.map((place) => {
          return (
            <PlaceItem
              title={place.title}
              description={place.description}
              id={place._id}
              image={place.image.imageUrl}
              creatorId={place.creator}
            />
          );
        })}
      </div>
    </Fade>
  );
};

export default PlaceList;
