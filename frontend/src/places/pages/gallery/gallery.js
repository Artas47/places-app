import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";
import Spinner from "../../../shared/components/spinner/spinner";
import InfiniteScroll from 'react-infinite-scroller';
import useScroll from "../../../shared/hooks/useScroll";

const Gallery = () => {
  const [places, setPlaces] = useState([]);
  const { userId } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const { sendRequest, isLoading } = useHttpClient();


//   useScroll("image-gallery");

  const fetch = async () => {
    const response = await sendRequest(
      `${process.env.REACT_APP_ROOT_API_ROUTE}/places/random?page=${page}&limit=10`,
      "GET"
    );
    console.log(`response.results`, response.results)
    let newPlaces= null;
    // if(places.length){
        newPlaces = [...places, ...response.results];
    // }
    console.log(`newPlaces`, newPlaces)
    setPlaces(newPlaces);
  };
  useEffect(() => {
    fetch();
  }, [userId, sendRequest, page]);

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Spinner center />
      </div>
    );
  }

  if (!places || !places.length) {
    return <InfoBox label="Looks like there is no places..." />;
  }

  const loadFunc = () => {
      console.log('AAAAAAAAAAAAAAAAA')
      setPage(2);
  }

  return (
  <InfiniteScroll
  pageStart={page}
  initialLoad={false}
  loadMore={loadFunc}
  hasMore={true || false}
  loader={<div className="loader" key={0}>Loading ...</div>}
  useWindow={false}
> 
<ImageGallery path="/gallery" places={places} /> 
</InfiniteScroll>);
};

export default Gallery;
