import React from "react";
import Searchbar from "../searchbar/searchbar";
import AppsIcon from "@material-ui/icons/Apps";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";

const HeaderSecondary = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <Searchbar style={{ justifyContent: "center" }} />
    </div>
  );
};

export default HeaderSecondary;
