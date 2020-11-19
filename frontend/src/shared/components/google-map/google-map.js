import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";

const GoogleMap = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  console.log("I RTSUDYBFSD");
  return (
    <div>
      {!iframeLoaded && (
        <Spinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1",
          }}
          className="color-white"
        />
      )}
      <iframe
        id="iframe1"
        width="100%"
        onLoad={() => {
          setIframeLoaded(true);
        }}
        style={{ display: iframeLoaded ? "block" : "none" }}
        height="800px"
        src="https://www.google.com/maps/embed/v1/view?key=AIzaSyAGtJ63Nwbrvl_3LwBqakW85Sz7Q9QFKiI&center=-33.8569,151.2152&zoom=18&maptype=satellite"
      />
    </div>
  );
};

export default GoogleMap;
