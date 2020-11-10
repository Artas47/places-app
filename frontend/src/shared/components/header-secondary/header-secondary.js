import React from "react";
import Searchbar from "../searchbar/searchbar";

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
