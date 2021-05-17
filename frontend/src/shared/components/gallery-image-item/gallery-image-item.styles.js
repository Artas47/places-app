import styled from "styled-components";

export const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: 0;
  transition: opacity 0.7s;
`;

export const ImageContent = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
  /* height: 10rem; */
  height: 100%;
  background-color: rgba(0,0,0,0.12);
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px -130px 30px -94px rgba(0, 0, 0, 0.15) inset;
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
    ${ImageContent} {
      opacity: 0.9;
    }
  }
`;

export const GalleryImageButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transition: all .2s;
  :hover {
    background-color: rgba(0,0,0,0.8);
    border-radius: 10px;
    transform: scale(1.3);
  }
`;

export const ImageDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin: 0.5rem 0 0.5rem 1rem;
`;

export const ImageTitle = styled.p`
  color: #fff;
`;

export const ImageAuthor = styled.p`
  color: #fff;
  font-weight: 300;
`;

export const ImageFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
`;
