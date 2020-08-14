import styled from 'styled-components';

export const PlaceItem = styled.div`
  height: 60rem;
  width: 60rem;
  margin: 4rem auto;
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.3);
`;

export const PlaceItemImg = styled.div`
  width: 100%;
  height: 70%;
  background-image: url('https://source.unsplash.com/random');
  background-size: cover;
  background-position: center;
`;

export const PlaceItemDescription = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #636e72;
`;

export const PlaceItemDescriptionName = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`;

export const PlanItemDescriptionButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  height: 10%;
`;

export const PlaceItemDescriptionContent = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
`;

export const PlaceItemButton = styled.button`
  height: 3.5rem;
  width: 15rem;
  color: #616161;
  border: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0 3rem;
  outline: none;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  :hover {
    background-color: #e8e8e8;
  }
`;
