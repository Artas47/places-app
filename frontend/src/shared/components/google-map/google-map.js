import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import Fade from "../fade-animation/fade";
import GoogleMapReact from "google-map-react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXJ0aTQ3IiwiYSI6ImNraHQydTh0MjBxMzYycWxoNm54aWJld2EifQ._wR4gZMPRohZ3pX3ZEgURw",
});

const GoogleMap = ({ placeCords }) => {
  useEffect(() => {
    setCords(placeCords);
  }, []);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cords, setCords] = useState({
    lat: -0.481747846041145,
    lng: 51.3233379650232,
  });
  // console.log("cords", cords);
  const _onClickMap = (map, evt) => {
    // console.log(evt.lngLat);
    setCords(evt.lngLat);
  };
  return (
    <Fade in={true} classNames="fadeModal">
      <div style={{ backgroundColor: "#E5E2DE" }}>
        {isLoading && (
          <Spinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "1",
            }}
            // className="color-white"
          />
        )}
        <Map
          style="mapbox://styles/mapbox/satellite-streets-v11"
          containerStyle={{
            height: "60vh",
            width: "100%",
          }}
          // center={[placeCords.lng, placeCords.lat]}
          // zoom={[16]}
          onStyleLoad={() => setIsLoading(false)}
          onClick={_onClickMap}
          // onBoxZoomEnd={(e) => console.log(e.getCenter())}
          onBoxZoomEnd={(e) => console.log(e.getZoom())}
        >
          <Marker coordinates={[cords.lng, cords.lat]} anchor="bottom">
            <img src={"https://picsum.photos/200/300"} />
          </Marker>
          <Layer
            raster
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            {/* <Feature raster coordinates={[placeCords.lat, placeCords.lng]} /> */}
          </Layer>
        </Map>
        ;
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAGtJ63Nwbrvl_3LwBqakW85Sz7Q9QFKiI" }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact> */}
        {/* <iframe
          id="iframe1"
          width="100%"
          onLoad={() => {
            setIframeLoaded(true);
          }}
          style={{
            display: iframeLoaded ? "block" : "none",
          }}
          height="800px"
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAGtJ63Nwbrvl_3LwBqakW85Sz7Q9QFKiI&center=${placeCords}&zoom=18&maptype=satellite`}
        /> */}
      </div>
    </Fade>
  );
};

export default GoogleMap;
