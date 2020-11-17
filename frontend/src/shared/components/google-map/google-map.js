import React from "react";

const GoogleMap = () => {
  return (
    <div>
      <iframe
        width="100%"
        height="800px"
        src="https://www.google.com/maps/embed/v1/view?key=&center=-33.8569,151.2152&zoom=18&maptype=satellite"
      />
    </div>
  );
};

export default GoogleMap;
