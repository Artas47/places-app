import React from 'react';
import ProfilePic from '../../../resources/images/profile-pic.jpg';
import * as Styled from './user-card.styles';

const UserCard = ({ name, interests, following, followers, likes }) => {
  return (
    <Styled.UserCard>
      <Styled.UserCardHeader>
        <Styled.UserCardHeaderImage src={ProfilePic} />
        <Styled.UserCardHeaderName>{name}</Styled.UserCardHeaderName>
        <Styled.UserCardHeaderInterests>
          {interests.join(', ')}
        </Styled.UserCardHeaderInterests>
      </Styled.UserCardHeader>
      <Styled.UserCardFooter>
        <Styled.UserCardButton>Follow</Styled.UserCardButton>
        <Styled.UserCardFooterRatings>
          <Styled.UserCardFooterRating>
            <Styled.UserCardRatingsCount>
              {following}
            </Styled.UserCardRatingsCount>
            <Styled.UserCardFooterText>following</Styled.UserCardFooterText>
          </Styled.UserCardFooterRating>
          <Styled.UserCardFooterRating>
            <Styled.UserCardRatingsCount>
              {followers}
            </Styled.UserCardRatingsCount>
            <Styled.UserCardFooterText>followers</Styled.UserCardFooterText>
          </Styled.UserCardFooterRating>
          <Styled.UserCardFooterRating>
            <Styled.UserCardRatingsCount>{likes}</Styled.UserCardRatingsCount>
            <Styled.UserCardFooterText>likes</Styled.UserCardFooterText>
          </Styled.UserCardFooterRating>
        </Styled.UserCardFooterRatings>
      </Styled.UserCardFooter>
    </Styled.UserCard>
  );
};

export default UserCard;
