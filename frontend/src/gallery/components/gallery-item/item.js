import React, { useState, useEffect, useRef } from "react";
import * as S from "./item.styles";
import Fade from "../../../shared/components/fade-animation/fade";
import Spinner from "../../../shared/components/spinner/spinner";

const GalleryItem = ({ imgUrl, imageWidth, imageHeight }) => {
  const [isLoaded, setIsLoaded] = useState("loading");
  const [isAnimationLoading, setIsAnimationLoading] = useState(false);
  const ref = useRef();

  const handleImageLoaded = () => {
    setIsLoaded("loaded");
    setIsAnimationLoading(true);
  };

  return (
    <S.GalleryItem
      background={isLoaded === "error"}
      height={imageHeight}
      width={imageWidth}
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
