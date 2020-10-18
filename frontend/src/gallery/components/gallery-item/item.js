import React, { useState, useEffect, useRef } from "react";
import * as S from "./item.styles";
import Fade from "../../../shared/components/fade-animation/fade";
import Spinner from "../../../shared/components/spinner/spinner";

const GalleryItem = ({ imgUrl }) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState("loading");
  const [isAnimationLoading, setIsAnimationLoading] = useState(false);
  const ref = useRef();
  const handleImageLoaded = () => {
    setIsLoaded("loaded");
    setIsAnimationLoading(true);
  };

  useEffect(() => {
    const getImgHeightAndWidth = () => {
      try {
        const width = ref.current.naturalWidth;
        const height = ref.current.naturalHeight;
        setImgWidth(width);
        setImgHeight(height);
      } catch (error) {
        console.log(error);
      }
    };
    ref.current.addEventListener("load", getImgHeightAndWidth);
  }, [setImgWidth, setImgHeight]);
  return (
    <S.GalleryItem
      background={isLoaded === "error"}
      height={imgHeight}
      width={imgWidth}
    >
      <S.ImageNotLoaded>
        {isLoaded === "loading" ? <Spinner /> : ""}
      </S.ImageNotLoaded>
      <Fade in={isAnimationLoading} classNames="fade">
        <S.GalleryItemImg
          visible={isLoaded === "loaded"}
          onLoad={handleImageLoaded}
          // onError={handleImageError}
          // onClick={onClickHandler}
          ref={ref}
          src={imgUrl}
        />
      </Fade>
    </S.GalleryItem>
  );
};

export default GalleryItem;
