import styled from "styled-components";

export const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: 0;
  transition: opacity 0.7s;
`;

export const ImageFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
  height: 10rem;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: inset 0px -5rem 28px -9px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: all 0.2s;
  font-size: 1.5rem;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;

  &:hover {
    ${ImageFooter} {
      opacity: 0.9;
    }
  }
`;

export const GalleryImageButton = styled.div`
  position: relative;
  border-radius: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  margin: 0;
  border: 0;
  transition: all 0.2s;
  :not(:last-child) {
    :after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      background-color: #fff;
      display: block;
    }
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const ImageDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin: 0.5rem 0 2rem 1rem;
`;

export const ImageTitle = styled.p`
  color: #fff;
`;

export const ImageAuthor = styled.p`
  color: #fff;
  font-weight: 300;
`;
