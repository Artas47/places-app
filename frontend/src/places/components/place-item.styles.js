import styled, { css } from "styled-components";
import CustomButton from "../../shared/components/button/button";

export const PlaceItem = styled.div`
  height: 60rem;
  width: 60rem;
  margin: 4rem auto;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.3);
`;

export const PlaceItemImg = styled.img`
  /* width: 10rem;
  height: 10rem; */
  /* background-image: url('http://localhost:5000/uploads/images/048827e4-f651-427a-b5fb-57fc072ec127.png'); */
  ${(props) => {
    const img = `http://localhost:5000/${props.imageUrl}`;
    return (
      props.imageUrl &&
      css`
        background-image: url("${img}");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      `
    );
  }}
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

export const PlaceItemButton = styled(CustomButton)`
  position: relative;
  width: 100%;
  border-radius: 0;
  overflow: hidden;
  color: #fff;
  background-color: #2b2b52;
  margin: 0;
  border: 0;
  :hover {
    background-color: rgba(43, 43, 82, 0.7);
  }
  :not(:last-child) {
    :after {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      background-color: #fff;
      display: block;
    }
  }
`;
