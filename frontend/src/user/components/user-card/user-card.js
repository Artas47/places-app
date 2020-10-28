import React, { useContext } from "react";
import ProfilePic from "../../../resources/images/user.svg";
import * as Styled from "./user-card.styles";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

const UserCard = ({
  name,
  interests,
  following,
  followers,
  likes,
  image,
  id,
}) => {
  const history = useHistory();
  const { userId } = useContext(AuthContext);
  // console.log("userId", userId);
  return (
    <Styled.UserCard>
      <Styled.UserCardHeader>
        <Styled.UserCardHeaderImage
          src={image ? `http://localhost:5000/${image}` : ProfilePic}
        />
        <Styled.UserCardHeaderName>{name}</Styled.UserCardHeaderName>
        <Styled.UserCardHeaderInterests>
          {interests ? interests.join(", ") : ""}
        </Styled.UserCardHeaderInterests>
      </Styled.UserCardHeader>
      <Styled.UserCardFooter>
        <div style={{ display: "flex" }}>
          <Styled.UserCardButton>Follow</Styled.UserCardButton>
          <Styled.UserCardButton
            onClick={() => {
              if (userId === id) {
                history.push(`/places`);
                return;
              }
              history.push(`/places/user/${id}`);
            }}
          >
            View places
          </Styled.UserCardButton>
        </div>
        <Styled.UserCardFooterRatings>
          <Styled.UserCardFooterRating>
            <Styled.UserCardRatingsCount>
              {following ? following : 0}
            </Styled.UserCardRatingsCount>
            <Styled.UserCardFooterText>following</Styled.UserCardFooterText>
          </Styled.UserCardFooterRating>
          <Styled.UserCardFooterRating>
            <Styled.UserCardRatingsCount>
              {followers ? followers : 0}
            </Styled.UserCardRatingsCount>
            <Styled.UserCardFooterText>followers</Styled.UserCardFooterText>
          </Styled.UserCardFooterRating>
          <Styled.UserCardFooterRating>
            <Styled.UserCardRatingsCount>
              {likes ? likes : 0}
            </Styled.UserCardRatingsCount>
            <Styled.UserCardFooterText>likes</Styled.UserCardFooterText>
          </Styled.UserCardFooterRating>
        </Styled.UserCardFooterRatings>
      </Styled.UserCardFooter>
    </Styled.UserCard>
  );
};

export default UserCard;
