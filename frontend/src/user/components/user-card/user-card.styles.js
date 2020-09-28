import styled from "styled-components";
import CustomButton from "../../../shared/components/button/button";

export const UserCard = styled.div`
  width: 50rem;
  height: 50rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  margin: 2rem auto;
  overflow: hidden;
  box-shadow: 1px 4px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  :hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const UserCardHeader = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UserCardHeaderImage = styled.img`
  width: 15rem;
  height: 15rem;
  max-width: 15rem;
  max-height: 15rem;
  border-radius: 50%;
  /* background-color: red; */
  fill: red;
  color: red;
`;

export const UserCardHeaderName = styled.p`
  font-size: 2rem;
  color: #2c2c54;
  text-align: center;
  font-weight: 600;
  margin: 1.5rem 0;
`;

export const UserCardHeaderInterests = styled.p`
  font-size: 1.8rem;
  color: #2c2c54;
  text-align: center;
  font-weight: 300;
  margin: 0;
`;

export const UserCardFooter = styled.div`
  width: 100%;
  height: 35%;
  background-color: #2b2b52;
  opacity: 0.8;
  position: relative;
`;

export const UserCardFooterRatings = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: space-around;
  align-items: center;
`;

export const UserCardFooterRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  width: 33%;
  position: relative;
  &:not(:last-child) {
    :after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      height: 5rem;
      width: 2px;
      display: block;
      background-color: #fff;
    }
  }
`;

export const UserCardFooterText = styled.p`
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.7px;
  font-size: 1.2rem;
`;

export const UserCardRatingsCount = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

export const UserCardButton = styled(CustomButton)`
  // position: absolute;
  width: 50%;
  border-radius: 0;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
