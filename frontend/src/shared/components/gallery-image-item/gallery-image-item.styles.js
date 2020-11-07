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
  height: 4.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #718093;
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
  height: 100%;
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
