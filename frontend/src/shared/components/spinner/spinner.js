import React from "react";
import "./spinner.css";

const Spinner = ({ className, style, center }) => {
  const centerStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1",
  };
  return (
    <div
      style={(style, center && centerStyles)}
      className={`lds-ring ${
        Array.isArray(className) ? className.join(" ") : className
      }`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
