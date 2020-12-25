import React, { useState } from "react";
import Spinner from "../spinner/spinner";
import Fade from "../fade-animation/fade";
import ReactMapboxGl, { Layer } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXJ0aTQ3IiwiYSI6ImNraHQydTh0MjBxMzYycWxoNm54aWJld2EifQ._wR4gZMPRohZ3pX3ZEgURw",
});

const GoogleMap = ({ placeCords, setCords, setZoom, setValue }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Fade in={true} classNames="fadeModal">
      <div>
        {isLoading && <Spinner center className="color-white" />}
        <Map
          style={"mapbox://styles/mapbox/satellite-streets-v11"} // eslint-disable-line react/style-prop-object
          containerStyle={{
            height: "70vh",
            width: "100%",
            transition: "all .3s",
            filter: isLoading && "brightness(60%)",
          }}
          center={placeCords && [placeCords.lng, placeCords.lat]}
          zoom={placeCords?.zoom && [placeCords.zoom]}
          onStyleLoad={() => setIsLoading(false)}
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
