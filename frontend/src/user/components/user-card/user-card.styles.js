import styled from 'styled-components';

export const UserCard = styled.div`
  width: 50rem;
  height: 50rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  margin: 2rem auto;
  overflow: hidden;
  box-shadow: 1px 4px 5px rgba(0, 0, 0, 0.3);
`;

export const UserCardHeader = styled.div`
  width: 100%;
  background: rgb(148, 187, 233);
  background: linear-gradient(
    145deg,
    rgba(148, 187, 233, 0.5082808123249299) 0%,
    rgba(91, 140, 198, 0.5082808123249299) 100%
  );
  height: 70%;
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
  height: 30%;
  background-color: #2c2c54;
  opacity: 0.8;
  position: relative;
`;

export const UserCardFooterRatings = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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
      content: '';
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

export const UserCardButton = styled.button`
  /* width: 5rem; */
  position: absolute;
  right: 50%;
  box-shadow: 1px -2px 5px rgba(0, 0, 0, 0.3);
  transform: translate(50%, -50%);
  padding: 1.3rem 5rem;
  border-radius: 4rem;
  font-size: 1.8rem;
  border: 0;
  /* height: 3rem; */
  background-color: #fff;
  outline: none;
`;
