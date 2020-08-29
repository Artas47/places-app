import React from "react";
import { CSSTransition } from "react-transition-group";
import "./fade.css";

const Fade = ({ children, ...props }) => {
  return (
    <CSSTransition classNames="fade" timeout={1000} {...props} appear>
      {children}
    </CSSTransition>
  );
};

export default Fade;
