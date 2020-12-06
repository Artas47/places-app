import React, { useState } from "react";
import Spinner from "../spinner/spinner";
import Fade from "../fade-animation/fade";
import ReactMapboxGl, { Layer, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXJ0aTQ3IiwiYSI6ImNraHQydTh0MjBxMzYycWxoNm54aWJld2EifQ._wR4gZMPRohZ3pX3ZEgURw",
});

const GoogleMap = ({ placeCords, setCords, cords, setZoom, setValue }) => {
  const [isLoading, setIsLoading] = useState(true);

  const _onClickMap = (map, evt) => {
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
          />
        )}
        <Map
          style="mapbox://styles/mapbox/satellite-streets-v11"
          containerStyle={{
            height: "60vh",
            width: "100%",
          }}
          center={placeCords && [placeCords.lng, placeCords.lat]}
          zoom={placeCords?.zoom && [placeCords.zoom]}
          onStyleLoad={() => setIsLoading(false)}
          // onClick={(map, evt) => {
          //   if (!placeCords) {
          //     _onClickMap(map, evt);
          //   }
          //   return;
          // }}
          onMoveEnd={(e) => {
            const lng = e.getCenter().lng.toFixed(4);
            const lat = e.getCenter().lat.toFixed(4);
            setCords &&
              setCords({
                lng,
                lat,
              });
            setValue && setValue("address", `${lat}, ${lng}`);
            setZoom && setZoom(e.getZoom());
          }}
        >
          {/* <Marker
            coordinates={
              cords
                ? [cords.lng, cords.lat]
                : [51.3233379650232, -0.481747846041145]
            }
            anchor="bottom"
          >
            <img alt="marker" src={"https://picsum.photos/200/300"} />
          </Marker> */}
          <Layer
            raster
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          ></Layer>
        </Map>
        ;
      </div>
    </Fade>
  );
};

export default React.memo(GoogleMap);
