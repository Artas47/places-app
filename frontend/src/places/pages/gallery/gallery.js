import React, { useEffect, useState, useContext } from "react";
import ImageGallery from "../../../shared/components/image-gallery/image-gallery";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InfoBox from "../../../shared/components/info-box/info-box";
import Spinner from "../../../shared/components/spinner/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const Gallery = () => {
  const [places, setPlaces] = useState([]);
  const { userId } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { sendRequest, isLoading } = useHttpClient();

  const initialFetch = async () => {
    const response = await sendRequest(
      `${process.env.REACT_APP_ROOT_API_ROUTE}/places/random?page=1&limit=10`,
      "GET"
    );
    setPlaces(response.results);
  };

  useEffect(() => {
    initialFetch();
  }, [sendRequest, userId]);

  const fetchOnScroll = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ROOT_API_ROUTE}/places/random?page=${page}&limit=10`
      );
      if (res.data.results.length === 0) {
        setHasMore(false);
      } else {
        setPlaces((prev) => [...prev, ...res.data.results]);
      }
    } catch (error) {
      console.log(`error`, error);
      alert("Error fetching places", error);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchOnScroll();
    }
  }, [page]);

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

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={() => {
        setPage((prev) => prev + 1);
      }}
      loader={"LOADING"}
      endMessage={"NO MORE DATA"}
      dataLength={places.length}
    >
      <ImageGallery path="/gallery" places={places} />
    </InfiniteScroll>
  );
};

export default Gallery;
